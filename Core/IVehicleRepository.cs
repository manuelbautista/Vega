using System.Threading.Tasks;
using ASP.NET_Core_Angular.Models;

namespace ASP.NET_Core_Angular.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
    }
}