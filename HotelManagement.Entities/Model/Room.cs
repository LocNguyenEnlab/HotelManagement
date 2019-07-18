using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HotelManagement.Entities.Model
{
    [Table("Room")]
    public class Room
    {
        [Key]
        public string RoomNumber { get; set; }
        public string Status { get; set; }
        public double Price { get; set; }
        //public string CheckinTime{ get; set; }
        //public string CheckoutTime { get; set; }
        public string Type { get; set; }
        public ICollection<Client> Clients { get; set; }
        public string GroupBookingDetailId { get; set; }
        public GroupBookingDetail GroupBookingDetail { get; set; }
        public string InvoiceId { get; set; }
        public Invoice Invoice { get; set; }
        public string BookedClientsListId { get; set; }
        public BookedClientsList BookedClientsList { get; set; }
        public string GroupCheckinId { get; set; }
        public GroupCheckin GroupCheckin { get; set; }
        public PersonalBookingDetail PersonalBookingDetail { get; set; }
    }
}
