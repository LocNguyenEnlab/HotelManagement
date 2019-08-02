using System.Collections.Generic;
using HotelManagement.Entities.Model;
using HotelManagement.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IGenericService<Room> _roomService;

        public RoomController(IGenericService<Room> roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]
        public List<Room> Get()
        {
            return _roomService.GetAll();
        }

        [HttpGet("/api/room/{roomName}")]
        public Room Get(string roomName)
        {
            return _roomService.Get(roomName);
        }

        [HttpPut]
        public void Put(Room room)
        {
            foreach (var client in room.Clients)
            {
                client.Room = room;
                client.RoomName = room.Name;
            }
            _roomService.Update(room);
        }
    }
}