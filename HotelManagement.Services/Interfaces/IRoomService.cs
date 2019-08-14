using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Services.Interfaces
{
    public interface IRoomService : IGenericService<Room>
    {
        Room Get(string roomName);

        IList<Room> Search(string searchTerm);
    }
}
