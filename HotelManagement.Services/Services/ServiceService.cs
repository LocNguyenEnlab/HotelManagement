using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;

namespace HotelManagement.Services.Services
{
    public class ServiceService : GenericService<Service>
    {
        public ServiceService(EnlabHotelContext context) : base(context)
        {
        }
    }
}
