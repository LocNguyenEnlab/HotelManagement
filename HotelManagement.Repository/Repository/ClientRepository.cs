using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Repository.Repository
{
    public class ClientRepository : IClientRepository
    {
        private EnlabHotelContext _context;


        public ClientRepository(EnlabHotelContext context)
        {
            _context = context;
        }

        public List<Client> GetAll()
        {
            return _context.Client.ToList();
        }

        public List<Client> Get(string roomName)
        {
            return _context.Client.Where(_ => _.RoomName == roomName).ToList();
        }

        public Client Get(int id)
        {
            return _context.Client.Where(_ => _.Id == id).FirstOrDefault();
        }
    }
}
