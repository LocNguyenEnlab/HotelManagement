using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Repository.Interfaces
{
    public interface IServiceTypeRepository
    {
        List<ServiceType> GetAll(); 
    }
}
