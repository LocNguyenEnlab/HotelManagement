using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Services.Interfaces;
using HotelManagement.Services.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private IClientService _service;

        public ClientController(IClientService clientService)
        {
            _service = clientService;
        }
        [HttpGet]
        public List<Client> Get()
        {
            //return _service.GetAll().ToList();
            var context = new EnlabHotelContext();
            return context.Client.Include("Room").ToList();
        } 

        [HttpPost]
        public void Post(Client client)
        {
            _service.Add(client);
        }

        [HttpPut]
        public void Put(Client client)
        {
            _service.Update(client);
        }

        [HttpDelete]
        public void Delete(int clientId)
        {
            _service.Delete(clientId);
        }
    }
}