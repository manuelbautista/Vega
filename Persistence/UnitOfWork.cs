using System.Threading.Tasks;

namespace ASP.NET_Core_Angular.Core
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VegaDbContext context;
        public UnitOfWork(VegaDbContext context)
        {
            this.context = context;

        }
        public async Task CompleteAsync()
        {
           await context.SaveChangesAsync();
        }
    }
}