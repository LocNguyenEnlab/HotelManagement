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
        

        public InvoiceController(IGenericService<Invoice> service)
        {
            _service = service;
        }

        [HttpGet]
        public List<Invoice> Get()
        {
            return _service.GetAll();
        }

        [HttpPost]
        public void Post(Invoice invoice)
        {
            _service.Add(invoice);
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