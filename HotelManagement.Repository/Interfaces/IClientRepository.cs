using HotelManagement.Entities.Model;
using HotelManagement.Repository.Repository;
using System.Collections.Generic;

namespace HotelManagement.Repository.Interfaces
{
    public interface IClientRepository : IGenericRepository<Client>
    {
        IList<Client> Get(string roomName);
    }
}
