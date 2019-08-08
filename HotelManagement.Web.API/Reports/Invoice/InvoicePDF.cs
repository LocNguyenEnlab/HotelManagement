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
            this.roomName.Text = invoice.Clients.First().RoomName + " (" + invoice.Clients.First().Room.Type.ToString() + ")";
            this.roomPrice.Text = Convert.ToDecimal(invoice.Clients.First().Room.Price.ToString()).ToString("C");
            this.roomMoney.Text = Convert.ToDecimal(invoice.RentTime * invoice.Clients.First().Room.Price).ToString("C");
            foreach(var serviceInvoice in invoice.ServicesOfInvoice)
            {
                var row = new XRTableRow();
                var cell0 = new XRTableCell();
                var cell1 = new XRTableCell();
                var cell2 = new XRTableCell();
                var cell3 = new XRTableCell();
                var cell4 = new XRTableCell();

                cell0.WidthF = 150;
                cell1.WidthF = 120;
                cell2.WidthF = 120;
                cell3.WidthF = 100;
                cell4.WidthF = 141;

                cell0.Text = serviceInvoice.OrderTime.ToString();
                cell1.Text = serviceInvoice.Service.Name;
                cell2.Text = Convert.ToDecimal(serviceInvoice.Service.Price).ToString("C");
                cell3.Text = serviceInvoice.Quantity.ToString();
                cell4.Text = Convert.ToDecimal(serviceInvoice.TotalAmount).ToString("C");

                row.Cells.Add(cell0);
                row.Cells.Add(cell1);
                row.Cells.Add(cell2);
                row.Cells.Add(cell3);
                row.Cells.Add(cell4);

                row.Borders = DevExpress.XtraPrinting.BorderSide.All;
                row.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter;

                this.tableService.Rows.Add(row);
            }
            var row2 = new XRTableRow();
            var cell02 = new XRTableCell();
            var cell12 = new XRTableCell();
            var cell22 = new XRTableCell();
            var cell32 = new XRTableCell();
            var cell42 = new XRTableCell();

            cell02.WidthF = 150;
            cell12.WidthF = 120;
            cell22.WidthF = 120;
            cell32.WidthF = 100;
            cell42.WidthF = 141;

            cell42.Text = Convert.ToDecimal(invoice.TotalServiceAmount).ToString("C");

            row2.Cells.Add(cell02);
            row2.Cells.Add(cell12);
            row2.Cells.Add(cell22);
            row2.Cells.Add(cell32);
            row2.Cells.Add(cell42);

            row2.Borders = DevExpress.XtraPrinting.BorderSide.All;
            row2.TextAlignment = DevExpress.XtraPrinting.TextAlignment.MiddleCenter;

            this.tableService.Rows.Add(row2);

            this.prepay.Text = Convert.ToDecimal(invoice.Prepay).ToString("C");
            this.discount.Text = Convert.ToDecimal(invoice.Discount).ToString("C");
            this.totalPayment.Text = Convert.ToDecimal(invoice.TotalAmount).ToString("C");
            this.notes.Text = invoice.Notes;
        }
    }
}
