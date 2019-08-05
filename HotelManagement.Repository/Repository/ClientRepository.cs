using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Repository.Repository
{
    public class ClientRepository : GenericRepository<Client>, IClientRepository
    {
        public ClientRepository(EnlabHotelContext context) : base(context)
        {
        }

        public override IList<Client> GetAll()
        {
            return _context.Client.Include(_ => _.Invoice).ToList();
        }

        public IList<Client> Get(string roomName)
        {
            return _context.Client.Where(_ => _.RoomName == roomName).ToList();
        }
    }
}
