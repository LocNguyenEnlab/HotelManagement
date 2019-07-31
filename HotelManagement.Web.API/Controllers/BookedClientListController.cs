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
    public class BookedClientListController : ControllerBase
    {
        private IBookedClientsListService _service;

        public BookedClientListController()
        {
            if (_service == null)
            {
                _service = new BookedClientListService(new EnlabHotelContext());
            }
        }

        [HttpGet]
        public List<BookedClientsList> Get()
        {
            return _service.GetAll().ToList();
        }

        [HttpPost]
        public void Post(BookedClientsList bookedClient)
        {
            _service.Add(bookedClient);
            _service.SaveChange();
        }

        [HttpPut]
        public void Put(BookedClientsList bookedClient)
        {
            _service.Update(bookedClient);
            _service.SaveChange();
        }

        [HttpDelete]
        public void Delete(int bookedClientId)
        {
            _service.Delete(bookedClientId);
            _service.SaveChange();
        }
    }
}