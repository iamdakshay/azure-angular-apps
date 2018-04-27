namespace StoreMe.APIs.Filters
{
    using Microsoft.IdentityModel.Protocols;
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.IdentityModel.Selectors;
    using System.IdentityModel.Tokens;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Security.Claims;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Http;
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;

    public class AADAuthorizeAttribute : FilterAttribute, IAuthorizationFilter
    {
        private static DateTime _stsMetadataRetrievalTime = DateTime.MinValue;
        private static string _issuer = string.Empty;
        private static List<SecurityToken> _signingTokens = null;
        private static string scopeClaimType = "http://schemas.microsoft.com/identity/claims/scope";

        public async Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
        {
            try
            {
                HttpRequestMessage request = actionContext.Request;
                AuthenticationHeaderValue authHeader = request.Headers.Authorization;

                if (null == authHeader)
                {
                    return CreateAzureADTokenValidationErrorResponse(HttpStatusCode.Unauthorized, "Request header not received.");
                }

                string jwtToken = authHeader.Parameter;

                if (null == jwtToken)
                {
                    return CreateAzureADTokenValidationErrorResponse(HttpStatusCode.Unauthorized, "Token is null in request header.");
                }

                string aadInstance = ConfigurationManager.AppSettings["aad:Instance"];
                string tenant = ConfigurationManager.AppSettings["aad:Tenant"];
                string audience = ConfigurationManager.AppSettings["aad:AppClientId"];

                string authority = $"{aadInstance}/{tenant}";

                return await ValidateAADToken(request, continuation, jwtToken, authority, audience);
            }
            catch (Exception exception)
            {
                return CreateAzureADTokenValidationErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        //protected override void HandleUnauthorizedRequest(System.Web.Http.Controllers.HttpActionContext actionContext)
        //{
        //    var challengeMessage = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
        //    challengeMessage.Headers.Add("WWW-Authenticate", "Basic");
        //    throw new HttpResponseException(challengeMessage);
        //}

        private HttpResponseMessage CreateAzureADTokenValidationErrorResponse(HttpStatusCode httpStatusCode, string errorMessage, string authority = null, string audience = null)
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage(httpStatusCode);
            httpResponseMessage.ReasonPhrase = errorMessage;

            AuthenticationHeaderValue authenticationHeaderValue = new AuthenticationHeaderValue("Bearer", $"authorization_uri='{authority}',resource_id={audience}");
            httpResponseMessage.Headers.WwwAuthenticate.Add(authenticationHeaderValue);

            return httpResponseMessage;
        }

        private async Task<HttpResponseMessage> ValidateAADToken(HttpRequestMessage request, Func<Task<HttpResponseMessage>> continuation, string token, string authority, string audience)
        {
            string issuer;
            List<SecurityToken> signingTokens;

            // The issuer and signingTokens are cached for 24 hours. They are updated if any of the conditions in the if condition is true.
            if (DateTime.UtcNow.Subtract(_stsMetadataRetrievalTime).TotalHours > 24
                || string.IsNullOrEmpty(_issuer)
                || _signingTokens == null)
            {
                // Get tenant information that's used to validate incoming jwt tokens
                string stsDiscoveryEndpoint = string.Format("{0}/.well-known/openid-configuration", authority);
                ConfigurationManager<OpenIdConnectConfiguration> configManager = new ConfigurationManager<OpenIdConnectConfiguration>(stsDiscoveryEndpoint);
                OpenIdConnectConfiguration config = await configManager.GetConfigurationAsync();
                _issuer = config.Issuer;
                _signingTokens = config.SigningTokens.ToList();

                _stsMetadataRetrievalTime = DateTime.UtcNow;
            }

            issuer = _issuer;
            signingTokens = _signingTokens;


            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidAudience = audience,
                IssuerSigningTokens = signingTokens,
                CertificateValidator = X509CertificateValidator.None
            };

            //// Validation parameters for single tenant deployment
            validationParameters.ValidIssuer = issuer;

            // Validate token.
            SecurityToken validatedToken = new JwtSecurityToken();
            ClaimsPrincipal claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);

            // Set the ClaimsPrincipal on the current thread.
            Thread.CurrentPrincipal = claimsPrincipal;

            // Set the ClaimsPrincipal on HttpContext.Current if the app is running in web hosted environment.
            if (HttpContext.Current != null)
            {
                HttpContext.Current.User = claimsPrincipal;
            }

            // If the token is scoped, verify that required permission is set in the scope claim.
            if (ClaimsPrincipal.Current.FindFirst(scopeClaimType) != null && ClaimsPrincipal.Current.FindFirst(scopeClaimType).Value != "user_impersonation")
            {
                return CreateAzureADTokenValidationErrorResponse(HttpStatusCode.Forbidden, "Unable to verify required permission in scope claim");
            }

            return await continuation();
        }

        public async Task<bool> get()
        {
            return true;
        }
    }
}