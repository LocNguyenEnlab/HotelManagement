using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Services.Interfaces
{
    public interface IInvoiceService : IGenericService<Invoice>
    {
        Invoice Get(string roomName);
    }
}
