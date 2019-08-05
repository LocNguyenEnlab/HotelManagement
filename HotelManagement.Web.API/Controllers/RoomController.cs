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
        public IList<Room> Get()
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
            _roomService.Update(room);
        }
    }
}