using HotelManagement.Entities.Model;
using System.Collections.Generic;

namespace HotelManagement.Repository.Interfaces
{
    public interface IInvoiceRepository : IGenericRepository<Invoice>
    {
        Invoice Get(string roomName);
    }
}
