using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Repository.Interfaces
{
    public interface IClientRepository
    {
        List<Client> GetAll();
        List<Client> Get(string roomName);
        Client Get(int id);
    }
}
