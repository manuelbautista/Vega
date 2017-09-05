using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using ASP.NET_Core_Angular.Models;
using System.ComponentModel.DataAnnotations;

namespace ASP.NET_Core_Angular.Controllers.Resources
{
    public class SaveVehicleResource
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public bool IsRegistered { get; set; }
        [Required]
        public ContactResource Contact {get;set;}
        public ICollection<int> Features { get; set; }

        public SaveVehicleResource()
        {
            Features = new Collection<int>();
        }
    }
}