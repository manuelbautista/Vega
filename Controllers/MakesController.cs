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
    public class MakesController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public MakesController(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var makes = await context.Makes.Include(m => m.Models).ToListAsync();

            return mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}