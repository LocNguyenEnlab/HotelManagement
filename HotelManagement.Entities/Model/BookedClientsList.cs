using System;
using System.Collections.Generic;
using System.Text;

namespace HotelManagement.Entities.Model
{
    public class BookedClientsList
    {
        public int Id { get; set; }
        public DateTime CheckinTime { get; set; }
        public DateTime CheckoutTime { get; set; }
        public int Code { get; set; }
        public string BookType { get; set; }
        public double Prepay { get; set; }
        public string Notes { get; set; }
        public DateTime CreatedTime { get; set; }
        public string Status { get; set; }
        public double Discount { get; set; }
        public Client Client { get; set; }
        public ICollection<Room> Rooms { get; set; }
    }
}
