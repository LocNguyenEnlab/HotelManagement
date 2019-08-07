using System.IO;
using System.Linq;
using HotelManagement.Entities.Model;
using HotelManagement.Web.API.Reports;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        //[HttpPost("/api/report/invoice")]
        //public FileStream Post(Invoice invoice)
        //{
        //    var invoicePDF = new InvoicePDF();
        //    invoicePDF.CreateInvoice(invoice);
        //    invoicePDF.ExportToPdf("./Reports/Invoice/" +
        //        invoice.Id + invoice.Clients.First().Name + ".pdf");
        //    return File.Open("./Reports/Invoice/" + invoice.Id + invoice.Clients.First().Name + ".pdf", FileMode.Open, FileAccess.Read);
        //}
    }
}