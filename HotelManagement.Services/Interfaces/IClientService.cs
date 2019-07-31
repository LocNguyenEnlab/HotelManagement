using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Services.Interfaces
{
    public interface IClientService
    {
        void Add(Client client);
        List<Client> GetAll();
        void Delete(int clientId);
        void Update(Client client);
        void SaveChange();
    }
}
