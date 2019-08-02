using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Services.Interfaces
{
    public interface IClientService
    {
        List<Client> GetAll();
        List<Client> Get(string roomName);
        Client Get(int id);
    }
}
