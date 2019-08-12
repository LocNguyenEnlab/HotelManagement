using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Repository.Interfaces
{
    public interface IRoomRepository : IGenericRepository<Room>
    {
        Room Get(string roomName);

        IList<Room> GetRoomsBySearchKey(string searchKey);
    }
}
