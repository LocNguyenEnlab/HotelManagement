using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Repository.Repository
{
    public class ServiceTypeRepository : IServiceTypeRepository
    {
        private EnlabHotelContext _context;

        public ServiceTypeRepository(EnlabHotelContext context)
        {
            _context = context;
        }

        public List<ServiceType> GetAll()
        {
            return _context.ServiceType.Include(_ => _.Services).ToList();
        }
    }
}
