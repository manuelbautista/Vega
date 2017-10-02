using System;
using Microsoft.EntityFrameworkCore;
using ASP.NET_Core_Angular.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ASP.NET_Core_Angular.Core.Models;
using System.Linq.Expressions;
using ASP.NET_Core_Angular.Extensions;
using ASP.NET_Core_Angular.Core;

public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext context;
        public PhotoRepository(VegaDbContext context)
        {
            this.context = context;
            
        }
        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId) {
            return await context.Photos
            .Where(p=> p.VehicleId == vehicleId)
            .ToListAsync();
        }
    }
