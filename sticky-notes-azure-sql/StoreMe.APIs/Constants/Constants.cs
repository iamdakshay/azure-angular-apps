namespace StoreMe.APIs
{
    public static class Constants
    {
        public const string SEARCH_QUERY = "select * from [dbo].[Notes] CROSS APPLY OPENJSON(Tags, '$') tag where(tag.value LIKE '{0}' OR Title LIKE '{0}') AND CreatedBy = '{1}'";

        public static class NoteFields
        {
            public const string Note = "Note";
            public const string Title = "Note";
            public const string Description = "Note";
            public const string Tags = "Note";
        }
    }

}