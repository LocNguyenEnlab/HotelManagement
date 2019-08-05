using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelManagement.Entities.Model;
using HotelManagement.Services.Interfaces;
using HotelManagement.Services.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IGenericService<Invoice> _service;
        private readonly IClientService _clientService;


        public InvoiceController(IGenericService<Invoice> service, IClientService clientService)
        {
            _service = service;
            _clientService = clientService;
        }

        [HttpGet]
        public IList<Invoice> Get()
        {
            return _service.GetAll();
        }

        [HttpPost]
        public void Post(Invoice invoice)
        {
            var clients = invoice.Clients;            
            invoice.Clients = null;
            _service.Add(invoice);
            foreach (var client in clients)
            {
                //client.InvoiceId = maxId;
                client.Invoice = invoice;
                _clientService.Update(client);
            }
        }

        [HttpPut]
        public void Put(Invoice invocie)
        {
            _service.Update(invocie);
        }

        [HttpDelete] 
        public void Delete(int invoiceId)
        {
            _service.Delete(invoiceId);
        }
    }
}