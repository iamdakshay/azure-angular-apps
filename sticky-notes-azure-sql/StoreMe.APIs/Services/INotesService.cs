using StoreMe.APIs.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace StoreMe.APIs.Services
{
    public interface INotesService
    {
        Task<Note> Create(Note note);

        Task<IEnumerable<Note>> Get(string searchQuery);

        Task<bool> Delete(string guid);

    }
}
