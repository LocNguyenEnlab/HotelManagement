using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagement.Entities.Model
{
    [Table("Invoice")]
    public class Invoice
    {
        [Key]
        public int Id { get; set; }
        public DateTime CheckinTime { get; set; }
        public DateTime CheckoutTime { get; set; }
        public int RentTime { get; set; }
        public double Prepay { get; set; }
        public double Discount { get; set; }
        public double TotalServiceMoney { get; set; }
        public double TotalRoomMoney { get; set; }
        public double TotalPayment { get; set; }
        public string Status { get; set; }
        public string Notes { get; set; }
        public ICollection<Service> Services { get; set; }
        public ICollection<Client> Clients { get; set; }
    }
}
