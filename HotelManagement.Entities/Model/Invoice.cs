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

        public double TotalServiceAmount { get; set; }

        public double TotalRoomAmount { get; set; }

        public double TotalAmount { get; set; }

        public string Status { get; set; }

        public string Notes { get; set; }

        public ICollection<ServiceOfInvoice> ServicesOfInvoice { get; set; }

        public ICollection<Client> Clients { get; set; }
    }
}
