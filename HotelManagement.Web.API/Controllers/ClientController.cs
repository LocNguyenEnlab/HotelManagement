using HotelManagement.Entities.Model;
using HotelManagement.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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
        public IList<Client> Get()
        {
            return _service.GetAll();
        }

        [HttpGet("/api/client/{id}")]
        public Client Get(int id)
        {
            return _service.Get(id);
        }

        [HttpGet("/api/client/roomname/{roomName}")]
        public IList<Client> Get(string roomName)
        {
            return _service.Get(roomName);
        }

        [HttpPut]
        public void Put(Client client)
        {           
            _service.Update(client);
        }

        [HttpPost]
        public void Post(Client client)
        {
            _service.Add(client);
        }

        [HttpDelete("/api/client/{id}")]
        public void Delete([FromRoute] int id)
        {
            _service.Delete(id);
        }
    }
}