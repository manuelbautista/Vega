using System.Collections.Generic;
using System.Threading.Tasks;
using ASP.NET_Core_Angular.Core.Models;

namespace ASP.NET_Core_Angular.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}