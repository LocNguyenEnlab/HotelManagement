using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Services.Services
{
    public class ServiceService : GenericService<Service>
    {
        private IGenericRepository<Service> _serviceRepository;


        public ServiceService(EnlabHotelContext context) : base(context)
        {
        }
    }
}
