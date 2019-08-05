using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Services.Services
{
    public class RoomService : IGenericService<Room>
    {
        private IRoomRepository _roomRepository;


        public RoomService(EnlabHotelContext context)
        {
            _roomRepository = new RoomRepository(context);
        }

        public IList<Room> GetAll()
        {
            return _roomRepository.GetAll().ToList();
        }

        public void Update(Room room)
        {
            _roomRepository.Update(room);
            _roomRepository.Save();
        }

        public Room Get(object roomName)
        {
            return _roomRepository.Get((string)roomName);
        }

        public void Delete(object roomName)
        {
            _roomRepository.Delete((string)roomName);
            _roomRepository.Save();
        }

        public void Add(Room room)
        {
            _roomRepository.Add(room);
        }

        public int GetMaxId()
        {
            return -1;
        }
    }
}
