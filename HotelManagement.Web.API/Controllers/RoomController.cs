using System.Collections.Generic;
using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Services.Interfaces;
using HotelManagement.Services.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace HotelManagement.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            //if (_roomService == null)
            //{
            //    _roomService = roomService;
            //}
            _roomService = roomService;
        }

        [HttpGet]
        public List<Room> Get()
        {
            //return _roomService.GetRooms();
            using (var context = new EnlabHotelContext())
            {
                return context.Room.Include("Clients").ToList();
            }
        }

        [HttpPut]
        public void Put(Room room)
        {
            foreach (var client in room.Clients)
            {
                client.Room = room;
                client.RoomName = room.Name;
            }
            _roomService.UpdateRoom(room);
        }
    }
}