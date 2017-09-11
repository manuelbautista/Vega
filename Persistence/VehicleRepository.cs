using System;
using Microsoft.EntityFrameworkCore;
using ASP.NET_Core_Angular.Models;
using System.Threading.Tasks;

namespace ASP.NET_Core_Angular.Core
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;

        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;            
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true) 
        {
            if(!includeRelated) {
                return await context.Vehicles.FindAsync(id);
            }

            return await context.Vehicles
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        // public async Task<Vehicle> GetVehicleWithMake(int id) {
            
        // }
        public void Add(Vehicle vehicle) {
            context.Vehicles.Add(vehicle);
        }
        public void Remove(Vehicle vehicle) {
            context.Remove(vehicle);
        }
    }
}