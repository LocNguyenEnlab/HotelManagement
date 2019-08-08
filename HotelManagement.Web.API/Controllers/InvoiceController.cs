using System.Collections.Generic;
using System.Linq;
using HotelManagement.Entities.Model;
using HotelManagement.Services.Interfaces;
using HotelManagement.Web.API.Reports;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;
        private readonly IClientService _clientService;
        private readonly IGenericService<ServiceOfInvoice> _serviceInvoiceService;


        public InvoiceController(IInvoiceService service, IClientService clientService, IGenericService<ServiceOfInvoice> genericService)
        {
            _invoiceService = service;
            _clientService = clientService;
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
            foreach (var client in clients)
            {
                client.Invoice = invoice;
                _clientService.Update(client);
            }
        }

        [HttpGet("/api/invoice/roomname/{roomName}")]
        public Invoice Get(string roomName)
        {
            return _invoiceService.Get(roomName);
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