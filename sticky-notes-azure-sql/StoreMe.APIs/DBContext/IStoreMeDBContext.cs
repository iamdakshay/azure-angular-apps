using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreMe.APIs.DBContext
{
    public interface IStoreMeDBContext : IDisposable
    {
        DbSet<Note> Notes { get; set; }

        Task<int> SaveChangesAsync();

    }
}
