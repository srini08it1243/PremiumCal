using Microsoft.EntityFrameworkCore;
using PremiumApi.Models;

namespace PremiumApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Occupation> Occupations { get; set; }
        public DbSet<Rating> Ratings { get; set; }
    }
}
