using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;

namespace HotelManagement.Services.Services
{
    public class ServiceTypeService : IServiceTypeService
    {
        private IServiceTypeRepository _serviceTypeRepository;


        public ServiceTypeService(EnlabHotelContext context)
        {
            _serviceTypeRepository = new ServiceTypeRepository(context);
        }

        public List<ServiceType> GetAll()
        {
            return _serviceTypeRepository.GetAll();
        }
    }
}
