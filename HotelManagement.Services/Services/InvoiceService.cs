using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Services.Services
{
    public class InvoiceService : GenericService<Invoice>, IInvoiceService
    {
        private IInvoiceRepository _invoiceRepository;


        public InvoiceService(EnlabHotelContext context) : base(context)
        {
            _invoiceRepository = new InvoiceRepository(context);
        }

        public override IList<Invoice> GetAll()
        {
            return _invoiceRepository.GetAll().ToList();
        }

        public Invoice Get(string roomName)
        {
            return _invoiceRepository.Get(roomName);
        }

        public int GetMaxId()
        {
            return _invoiceRepository.GetMaxId(_ => _.Id);
        }
    }
}
