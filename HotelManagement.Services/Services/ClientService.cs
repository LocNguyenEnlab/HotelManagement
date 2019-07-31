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

        public void Add(Client client)
        {
            _clientRepository.Add(client);
        }

        public void Update(Client client)
        {
            _clientRepository.Update(client);
        }

        public void Delete(int clientId)
        {
            _clientRepository.Delete(clientId);
        }

        public void SaveChange()
        {
            _clientRepository.Save();
        }
    }
}
