namespace StoreMe.APIs.Services
{
    using System.Web;

    public class BaseService : IBaseService
    {
        //protected StoreMeDb StoreMeDb;
        protected string UserEmail
        {
            get
            {
                return HttpContext.Current.User.Identity.Name;
            }
        }
        public BaseService()
        {

        }
    }
}
