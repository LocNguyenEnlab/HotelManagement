using System.Collections.Generic;
using HotelManagement.Entities.Model;
using HotelManagement.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;
        private readonly IGenericService<ServiceOfInvoice> _serviceInvoiceService;


        public InvoiceController(IInvoiceService service, IGenericService<ServiceOfInvoice> genericService)
        {
            _invoiceService = service;
            _serviceInvoiceService = genericService;
        }

        [HttpGet]
        public IList<Invoice> Get()
        {
            return _invoiceService.GetAll();
        }

        [HttpPost]
        public void Post(Invoice invoice)
        {
            var clients = invoice.Clients;            
            invoice.Clients = null;
            foreach (var service in invoice.ServicesOfInvoice)
            {
                service.Service = null;
            }
            _invoiceService.Add(invoice);
            //foreach (var client in clients)
            //{
            //    client.Invoice = invoice;
            //    if (client.Id != 0)
            //    {
            //        _clientService.Update(client);
            //    } 
            //    else
            //    {
            //        _clientService.Add(client);
            //    }
            //}
        }

        [HttpGet("/api/invoice/roomname/{roomName}")]
        public Invoice Get(string roomName)
        {
            return _invoiceService.Get(roomName);
        }

        [HttpGet("/api/invoice/getmaxid")]
        public int GetMaxId()
        {
            return _invoiceService.GetMaxId();
        }

        [HttpPut]
        public void Put(Invoice invoice)
        {
            _invoiceService.Update(invoice);
            foreach (var serviceOfInvoice in invoice.ServicesOfInvoice)
            {
                _serviceInvoiceService.Update(serviceOfInvoice);
            }
        }

        [HttpDelete] 
        public void Delete(int invoiceId)
        {
            _invoiceService.Delete(invoiceId);
        }

        //[HttpPut("/api/invoice/exportinvoice")]
        //public void ExportInvoice(Invoice invoice)
        //{
        //    var invoicePDF = new InvoicePDF();
        //    invoicePDF.CreateInvoice(invoice);
        //    invoicePDF.ExportToPdf("./Reports/Invoice/"  + invoice.Id + invoice.Clients.First().Name + ".pdf");
        //}
    }
}