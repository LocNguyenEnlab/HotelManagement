using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Services.Interfaces
{
    public interface IClientService : IGenericService<Client>
    {
        IList<Client> Get(string roomName);
    }
}
