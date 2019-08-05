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
    }
}
