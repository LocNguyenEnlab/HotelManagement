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
        private IGenericRepository<Client> _clientRepository;


        public ClientService(EnlabHotelContext context)
        {
            _clientRepository = new GenericRepository<Client>(context);
        }

        public List<Client> GetAll()
        {
            return _clientRepository.GetAll().ToList();
        }

        public Client Get(int id)
        {
            return _clientRepository.Get(id);
        }

        public void Add(Client client)
        {
            _clientRepository.Add(client);
            _clientRepository.Save();
        }

        public void Update(Client client)
        {
            _clientRepository.Update(client);
            _clientRepository.Save();
        }

        public void Delete(int clientId)
        {
            _clientRepository.Delete(clientId);
            _clientRepository.Save();
        }
    }
}
