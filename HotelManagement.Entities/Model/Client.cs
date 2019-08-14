using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public DateTime CheckinTime { get; set; }

        public DateTime CheckoutTime { get; set; }

        public int Code { get; set; }

        public string BookType { get; set; }

        public double Prepay { get; set; }

        public string Status { get; set; }

        public double Discount { get; set; }

        public string RoomName { get; set; }

        public Room Room { get; set; }

        public int? InvoiceId { get; set; }

        public Invoice Invoice { get; set; }
    }
}
