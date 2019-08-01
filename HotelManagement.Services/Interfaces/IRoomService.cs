using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Services.Interfaces
{
    public interface IRoomService
    {
        List<Room> GetRooms();

        void UpdateRoom(Room room);

        Room GetRoom(string roomName);
    }
}
