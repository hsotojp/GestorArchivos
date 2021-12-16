using GestorArchivos.Models;
using Microsoft.EntityFrameworkCore;

namespace GestorArchivos.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        { 
            
        }

        public DbSet<Usuario> usuario { get; set; }
        public DbSet<Archivo> archivo { get; set; }
    }
}
