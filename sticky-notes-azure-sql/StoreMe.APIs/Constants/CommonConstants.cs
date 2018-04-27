using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StoreMe.APIs
{
    public static class CommonConstants
    {
        public static class  Messages
        {
            public const string MandetoryFieldValidationFailed = "Mandetory field validation failed. Field:{0}"; 
            public const string NoteNotFound = "Object not found.";
            public const string UnauthorizedOperation = "User is not authorized to perform {0} operation.";
        }
    }

}