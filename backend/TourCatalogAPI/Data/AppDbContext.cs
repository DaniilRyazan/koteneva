using Microsoft.EntityFrameworkCore;
using TourCatalogAPI.Models;

namespace TourCatalogAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Tour> Tours { get; set; }
    }
}