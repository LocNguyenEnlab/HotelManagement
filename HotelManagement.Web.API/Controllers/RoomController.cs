using System.Collections.Generic;
using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Services.Interfaces;
using HotelManagement.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private IRoomService _roomService;

        public RoomController()
        {
            if (_roomService == null)
            {
                _roomService = new RoomService(new EnlabHotelContext());
            }
        }

        [HttpGet]
        public List<Room> Get()
        {
            return _roomService.GetRooms();
        }
        [HttpPut]
        public void Put(Room room)
        {
            _roomService.UpdateRoom(room);
            _roomService.SaveChange();
        }
    }
}