using System.Threading.Tasks;
using ASP.NET_Core_Angular.Models;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ASP.NET_Core_Angular.Core.Models;

namespace ASP.NET_Core_Angular.Core
{
    public interface IVehicleRepository
    {
        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);

    }
}