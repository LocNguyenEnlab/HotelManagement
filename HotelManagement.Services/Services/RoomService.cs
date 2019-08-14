using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;

namespace HotelManagement.Services.Services
{
    public class RoomService :  GenericService<Room>, IRoomService
    {
        private IRoomRepository _roomRepository;


        public RoomService(EnlabHotelContext context) : base(context)
        {
            _roomRepository = new RoomRepository(context);
        }

        public Room Get(string roomName)
        {
            return _roomRepository.Get(roomName);
        }

        public override IList<Room> GetAll()
        {
            return _roomRepository.GetAll();
        }

        public IList<Room> Search(string searchTerm)
        {
            return _roomRepository.Search(searchTerm);
        }
    }
}
