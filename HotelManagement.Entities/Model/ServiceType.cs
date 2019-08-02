using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Entities.Model
{
    [Table("ServiceType")]
    public class ServiceType
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Service> Services { get; set; }
    }
}
