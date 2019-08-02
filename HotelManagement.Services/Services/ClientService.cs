using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Services.Services
{
    public class ClientService : IClientService
    {
        private IClientRepository _clientRepository;


        public ClientService(EnlabHotelContext context)
        {
            _clientRepository = new ClientRepository(context);
        }

        public List<Client> GetAll()
        {
            return _clientRepository.GetAll().ToList();
        }

        public Client Get(int id)
        {
            return _clientRepository.Get(id);
        }

        public List<Client> Get(string roomName)
        {
            return _clientRepository.Get(roomName);
        }
    }
}
