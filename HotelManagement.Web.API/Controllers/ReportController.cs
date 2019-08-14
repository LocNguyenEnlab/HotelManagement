using System.IO;
using System.Linq;
using HotelManagement.Entities.Model;
using HotelManagement.Web.API.Reports;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        [HttpPost("/api/report/invoice/")]
        public dynamic Post(Invoice invoice)
        {
            var invoicePDF = new InvoicePDF();
            invoicePDF.CreateInvoice(invoice);

            var filePath = $"./Reports/Invoice/{invoice.Id + invoice.Clients.First().Name}.pdf";

            invoicePDF.ExportToPdf(filePath);

            using (var fileStream = new FileStream(filePath, FileMode.Open))
            {
                using (var stream = new MemoryStream())
                {
                    fileStream.CopyTo(stream);

                    return File(stream.ToArray(), "application/octet-stream");
                }
            }
            // return new { data = "./Reports/Invoice/" + invoice.Id + invoice.Clients.First().Name + ".pdf" };
        }
    }
}