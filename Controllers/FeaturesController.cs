using System.Collections.Generic;
using System.Threading.Tasks;
using ASP.NET_Core_Angular.Controllers.Resources;
using ASP.NET_Core_Angular.Models;
using ASP.NET_Core_Angular.Persistence;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASP.NET_Core_Angular.Controllers
{
    public class FeaturesController
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public FeaturesController(VegaDbContext context, IMapper mapper)
        {
        this.mapper = mapper;
        this.context = context;
        }
    
        [HttpGet("/api/features")]
        public async Task<IEnumerable<FeatureResource>> GetFeatures()
        {
        var features = await context.Features.ToListAsync();
        
        return mapper.Map<List<Feature>, List<FeatureResource>>(features); 
        }
    }
}