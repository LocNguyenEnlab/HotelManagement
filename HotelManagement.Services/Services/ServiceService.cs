using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Services.Services
{
    public class ServiceService : IGenericService<Service>
    {
        private IGenericRepository<Service> _serviceRepository;


        public ServiceService(EnlabHotelContext context)
        {
            _serviceRepository = new GenericRepository<Service>(context);
        }

        public List<Service> GetAll()
        {
            return _serviceRepository.GetAll().ToList();
        }

        public Service Get(object id)
        {
            return _serviceRepository.Get(id);
        }

        public void Add(Service service)
        {
            _serviceRepository.Add(service);
            _serviceRepository.Save();
        }

        public void Update(Service service)
        {
            _serviceRepository.Update(service);
            _serviceRepository.Save();
        }

        public void Delete(object serviceId)
        {
            _serviceRepository.Delete(serviceId);
            _serviceRepository.Save();
        }
    }
}
