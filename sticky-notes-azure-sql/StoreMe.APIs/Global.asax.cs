using StoreMe.APIs.DBContext;
using StoreMe.APIs.Filters;
using StoreMe.APIs.HttpMessageHandlers;
using StoreMe.APIs.Services;
using System;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using Unity;
using Unity.Lifetime;

namespace StoreMe.APIs
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            //GlobalConfiguration.Configuration.MessageHandlers.Add(new AzureADTokenValidationHandler());

            GlobalConfiguration.Configuration.Services.Replace(typeof(IExceptionHandler), new GlobalExceptionHandler());
            GlobalConfiguration.Configuration.Filters.Add(new AADAuthorizeAttribute());
            //GlobalConfiguration.Configuration.Filters.Add(new ExceptionAttribute());
            UnityContainer container = new UnityContainer();

            container.RegisterType<IStoreMeDBContext, StoreMeDb>(new HierarchicalLifetimeManager());
            container.RegisterType<INotesService, NotesService>(new HierarchicalLifetimeManager());
            GlobalConfiguration.Configuration.DependencyResolver = new UnityResolver(container);
        }

        /// <summary>
        /// Function to handle application begin request event
        /// </summary>
        /// <param name="sender">Sender object</param>
        /// <param name="e">Event arguments</param>
        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            //// Handle preflight request in CORS calls
            if (string.Equals(Request.HttpMethod, "OPTIONS", StringComparison.OrdinalIgnoreCase))
            {
                //// End response, this will return 200 OK status for preflight requests
                Response.End();
            }
        }
    }


}
