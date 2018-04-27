namespace StoreMe.APIs.Services
{
    using StoreMe.APIs.DBContext;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;

    public class NotesService : BaseService, INotesService
    {
      private readonly IStoreMeDBContext  StoreMeDbContext;    
        public NotesService(IStoreMeDBContext storeMeDbContext) : base()
        {
            this.StoreMeDbContext = storeMeDbContext;
        }

        public async Task<Note> Create(Note note)
        {  
            note.Id = Convert.ToString(Guid.NewGuid());
            note.CreatedBy = this.UserEmail;
            StoreMeDbContext.Notes.Add(note);
            await StoreMeDbContext.SaveChangesAsync();
            return note;
        }

        public async Task<IEnumerable<Note>> Get(string searchQuery)
        {
            IEnumerable<Note> notes = null;

            if (string.IsNullOrEmpty(searchQuery))
            {
                notes = StoreMeDbContext.Notes.Where(x => x.CreatedBy.Equals(UserEmail, StringComparison.InvariantCultureIgnoreCase));
            }
            else
            {
                notes = StoreMeDbContext.Notes.SqlQuery(string.Format(Constants.SEARCH_QUERY, searchQuery, UserEmail)).Distinct();
            }

            return notes;
        }

        public async Task<bool> Delete(string guid)
        {
            Note note = this.StoreMeDbContext.Notes.Find(guid);

            if (null == note)
            {
                throw new KeyNotFoundException(CommonConstants.Messages.NoteNotFound);
            }

            if (note.CreatedBy.Equals(UserEmail, StringComparison.InvariantCultureIgnoreCase))
            {
                StoreMeDbContext.Notes.Remove(note);
                await StoreMeDbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                throw new UnauthorizedAccessException(string.Format(CommonConstants.Messages.UnauthorizedOperation, "DELETE"));
            }
        }
    }
}
