using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Services.Interfaces;
using HotelManagement.Services.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private IClientService _service;

        public ClientController()
        {
            if (_service == null)
            {
                _service = new ClientService(new EnlabHotelContext());
            }
        }
        [HttpGet]
        public List<Client> Get()
        {
            return _service.GetAll().ToList();
        } 

        [HttpPost]
        public void Post(Client client)
        {
            _service.Add(client);
            _service.SaveChange();
        }

        [HttpPut]
        public void Put(Client client)
        {
            _service.Update(client);
            _service.SaveChange();
        }

        [HttpDelete]
        public void Delete(int clientId)
        {
            _service.Delete(clientId);
            _service.SaveChange();
        }
    }
}