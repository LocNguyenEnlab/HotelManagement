using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Repository.Interfaces
{
    public interface IRoomRepository : IGenericRepository<Room>
    {
        Room Get(string roomName);
    }
}
