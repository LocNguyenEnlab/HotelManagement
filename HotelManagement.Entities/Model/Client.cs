using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HotelManagement.Entities.Model
{
    [Table("Client")]
    public class Client
    {
        [Key]
        public string IdentityNumber { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Nationality { get; set; }
        public string Notes { get; set; }
        public string RoomNumber { get; set; }
        public Room Room { get; set; }
        public string BookedClientsListId { get; set; }
        public BookedClientsList BookedClientsList { get; set; }
        public string GroupCheckinId { get; set; }
        public BookedClientsList GroupCheckin { get; set; }
    }
}
