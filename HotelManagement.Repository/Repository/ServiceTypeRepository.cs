using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Repository.Repository
{
    public class ServiceTypeRepository : GenericRepository<ServiceType>
    {
        public ServiceTypeRepository(EnlabHotelContext context) : base(context)
        {
        }

        public override IList<ServiceType> GetAll()
        {
            return _context.ServiceType.Include(_ => _.Services).ToList();
        }
    }
}
