using System.Collections.Generic;
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
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
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

        [HttpGet("/api/room/search/{searchKey}")]
        public IList<Room> GetBySearchKey(string searchKey)
        {
            return _roomService.GetRoomsBySearchKey(searchKey);
        }

        [HttpPut]
        public void Put(Room room)
        {
            _roomService.Update(room);
        }
    }
}