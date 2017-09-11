using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace ASP.NET_Core_Angular.Controllers.Resources
{
    public class MakeResource : KeyValuePairResource
    {
        public ICollection<KeyValuePairResource> Models { get; set; }

        public MakeResource() {
            this.Models = new Collection<KeyValuePairResource>();
        } 
    }
}