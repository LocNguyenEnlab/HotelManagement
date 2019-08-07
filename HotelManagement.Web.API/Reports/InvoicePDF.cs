using System;
using System.Linq;
using DevExpress.XtraReports.UI;
using HotelManagement.Entities.Model;

namespace HotelManagement.Web.API.Reports
{
    public partial class InvoicePDF
    {
        public InvoicePDF()
        {
            InitializeComponent();
        }

        public void CreateInvoice(Invoice invoice)
        {
            this.clientName.Text = invoice.Clients.First().Name;
            this.checkinTime.Text = invoice.CheckinTime.ToString();
            this.checkoutTime.Text = invoice.CheckoutTime.ToString();
            this.rentTime.Text = invoice.RentTime.ToString() + " (day)";
            this.roomName.Text = invoice.Clients.First().RoomName;
            this.roomType.Text = invoice.Clients.First().Room.Type.ToString();
            this.roomPrice.Text = Convert.ToDecimal(invoice.Clients.First().Room.Price.ToString()).ToString("C");
            this.roomMoney.Text = this.roomPrice.Text + " x " + invoice.RentTime + " = " +
                Convert.ToDecimal(invoice.RentTime * invoice.Clients.First().Room.Price).ToString("C");
            foreach(var serviceInvoice in invoice.ServicesOfInvoice)
            {
                var row = new XRTableRow();
                var cell1 = new XRTableCell();
                var cell2 = new XRTableCell();
                var cell3 = new XRTableCell();
                var cell4 = new XRTableCell();

                cell1.Text = serviceInvoice.Service.Name;
                cell2.Text = Convert.ToDecimal(serviceInvoice.Service.Price).ToString("C");
                cell3.Text = serviceInvoice.Quantity.ToString();
                cell4.Text = Convert.ToDecimal(serviceInvoice.TotalMoney).ToString("C");

                row.Cells.Add(cell1);
                row.Cells.Add(cell2);
                row.Cells.Add(cell3);
                row.Cells.Add(cell4);

                row.Borders = DevExpress.XtraPrinting.BorderSide.All;
                row.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter;

                this.tableService.Rows.Add(row);
            }
            this.serviceMoney.Text = Convert.ToDecimal(invoice.TotalServiceMoney).ToString("C");
            this.prepay.Text = Convert.ToDecimal(invoice.Prepay).ToString("C");
            this.discount.Text = invoice.Discount.ToString() + " %";
            this.totalPayment.Text = Convert.ToDecimal(invoice.TotalPayment).ToString("C");
            this.notes.Text = invoice.Notes;
        }
    }
}
