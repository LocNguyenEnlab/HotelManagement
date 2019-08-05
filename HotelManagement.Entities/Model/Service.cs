using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Entities.Model
{
    [Table("Service")]
    public class Service
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public double Price { get; set; }

        public int ServiceTypeId { get; set; }

        public ServiceType ServiceType { get; set; }
    }
}
