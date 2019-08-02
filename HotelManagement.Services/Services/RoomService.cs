using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Services.Services
{
    public class RoomService : IGenericService<Room>
    {
        private IGenericRepository<Room> _roomRepository;

        public RoomService(EnlabHotelContext context)
        {
            _roomRepository = new GenericRepository<Room>(context);
        }

        public List<Room> GetAll()
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
            return _roomRepository.Get(roomName);
        }

        public void Delete(object roomName)
        {
            _roomRepository.Delete(roomName);
            _roomRepository.Save();
        }

        public void Add(Room room)
        {
            _roomRepository.Add(room);
        }
    }
}
