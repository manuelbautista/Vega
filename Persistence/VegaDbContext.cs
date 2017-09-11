using Microsoft.EntityFrameworkCore;
using ASP.NET_Core_Angular.Models;

namespace ASP.NET_Core_Angular.Core
{
    public class VegaDbContext: DbContext
    {
        
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Model> Models { get; set; }
        
        public  VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options) {
                
        }  
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            //creating 2 primary keys combination
            modelBuilder.Entity<VehicleFeature>().HasKey(vf => new {vf.VehicleId, vf.FeatureId});
        }
    }
}