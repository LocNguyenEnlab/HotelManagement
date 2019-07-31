using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Services.Interfaces
{
    public interface IBookedClientsListService
    {
        List<BookedClientsList> GetAll();
        void Add(BookedClientsList bookedClient);
        void Update(BookedClientsList bookedClient);
        void Delete(int bookedClientId);
        void SaveChange();
    }
}
