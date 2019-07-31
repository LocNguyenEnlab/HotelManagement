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
        public int Id { get; set; }
        public string IdentityOrPassport { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Nationality { get; set; }
        public string Notes { get; set; }
        public string RoomName { get; set; }
        public Room Room { get; set; }
        public int BookedClientsListId { get; set; }
        public BookedClientsList BookedClientsList { get; set; }
    }
}
