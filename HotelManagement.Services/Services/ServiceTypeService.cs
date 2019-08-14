using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;

namespace HotelManagement.Services.Services
{
    public class ServiceTypeService : IServiceTypeService
    {
        private IGenericService<ServiceType> _serviceTypeRepository;


        public ServiceTypeService(EnlabHotelContext context)
        {
            _serviceTypeRepository = new GenericService<ServiceType>(context);
        }

        public IList<ServiceType> GetAll()
        {
            return _serviceTypeRepository.GetAll();
        }
    }
}
