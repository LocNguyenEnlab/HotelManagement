using HotelManagement.Entities.Model;

namespace HotelManagement.Services.Interfaces
{
    public interface IInvoiceService : IGenericService<Invoice>
    {
        Invoice Get(string roomName);

        int GetMaxId();
    }
}
