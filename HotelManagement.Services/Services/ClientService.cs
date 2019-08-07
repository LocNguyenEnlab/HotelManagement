using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Services.Services
{
    public class ClientService : GenericService<Client>, IClientService
    { 
        private IClientRepository _clientRepository;


        public ClientService(EnlabHotelContext context) : base(context)
        {
            _clientRepository = new ClientRepository(context);
        }

        public override IList<Client> GetAll()
        {
            return _clientRepository.GetAll().ToList();
        }

        public IList<Client> Get(string roomName)
        {
            return _clientRepository.Get(roomName);
        }
    }
}
