using System.Threading.Tasks;

namespace ASP.NET_Core_Angular.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}