using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Entities.Model
{
    [Table("Room")]
    public class Room
    {
        [Key]
        public string Name { get; set; }

        public string Status { get; set; }

        public double Price { get; set; }

        public DateTime CheckinTime{ get; set; }

        public DateTime CheckoutTime { get; set; }

        public string Type { get; set; }

        public ICollection<Client> Clients { get; set; }

        public string Floor { get; set; }
    }
}
