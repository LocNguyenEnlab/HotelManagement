using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Services.Interfaces
{
    public interface IServiceTypeService
    {
        IList<ServiceType> GetAll();
    }
}
