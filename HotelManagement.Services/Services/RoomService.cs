using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Services.Services
{
    public class RoomService : IRoomService
    {
        private IGenericRepository<Room> _roomRepository;

        public RoomService(EnlabHotelContext context)
        {
            _roomRepository = new GenericRepository<Room>(context);
        }

        public List<Room> GetRooms()
        {
            return _roomRepository.GetAll().ToList();
        }

        public void UpdateRoom(Room room)
        {
            _roomRepository.Update(room);
        }

        public void SaveChange()
        {
            _roomRepository.Save();
        }
    }
}
