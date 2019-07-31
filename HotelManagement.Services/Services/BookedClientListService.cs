using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Services.Services
{
    public class BookedClientListService : IBookedClientsListService
    {
        private EnlabHotelContext _context;
        private IGenericRepository<BookedClientsList> _bookedClientsListRepo;

        public BookedClientListService(EnlabHotelContext context)
        {
            _context = context;
            _bookedClientsListRepo = new GenericRepository<BookedClientsList>(context);
        }

        public List<BookedClientsList> GetAll()
        {
            return _bookedClientsListRepo.GetAll().ToList();
        }

        public void Add(BookedClientsList bookedClient)
        {
            _bookedClientsListRepo.Add(bookedClient);
        }

        public void Update(BookedClientsList bookedClient)
        {
            _bookedClientsListRepo.Update(bookedClient);
        }

        public void Delete(int bookedClientId)
        {
            _bookedClientsListRepo.Delete(bookedClientId);
        }

        public void SaveChange()
        {
            _bookedClientsListRepo.Save();
        }
    }
}
