using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HotelManagement.Entities.Model
{
    [Table("ServiceOfInvoice")]
    public class ServiceOfInvoice
    {
        [Key]
        public int Id { get; set; }

        public int Quantity { get; set; }

        public double TotalMoney { get; set; }

        public int ServiceId { get; set; }

        public Service Service { get; set; }

        public int InvoiceId { get; set; }

        public Invoice Invocie { get; set; }
    }
}
