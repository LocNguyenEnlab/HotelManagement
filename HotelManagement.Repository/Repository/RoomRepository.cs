using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Repository.Repository
{
    public class RoomRepository : GenericRepository<Room>, IRoomRepository
    {
        public RoomRepository(EnlabHotelContext context) : base(context)
        {
        }

        public override IList<Room> GetAll()
        {
            return _context.Room.Include(_ => _.Clients).ToList();
        }

        public Room Get(string roomName)
        {
            return _context.Room.Where(_ => _.Name == roomName).FirstOrDefault();
        }

        public IList<Room> Search(string searchTerm)
        {
            searchTerm = searchTerm.ToLower();
            var rooms = _context.Room.Include(_ => _.Clients).ToList();
            var roomsSearch = new List<Room>();
            roomsSearch.AddRange(_context.Room.Include(_ => _.Clients)
                .Where(_ => (_.Name.ToLower().Contains(searchTerm) || _.Status.ToLower().Contains(searchTerm)) && _.Clients.Count != 0).ToList());
            foreach (var room in rooms)
            {
                var r = roomsSearch.Where(_ => _.Name == room.Name).SingleOrDefault();
                if (room.Clients.Count == 0 || r != null)
                {
                    continue;
                }
                if (room.Clients.Where(
                    _ => _.Email.ToLower().Contains(searchTerm)
                    || _.IdentityOrPassport.ToLower().Contains(searchTerm)
                    || _.Name.ToLower().Contains(searchTerm)
                    || _.Code.ToString().Contains(searchTerm)
                    ).FirstOrDefault() != null)
                {
                    roomsSearch.Add(room);
                }
            }
            
            return roomsSearch;
        }
    }
}
