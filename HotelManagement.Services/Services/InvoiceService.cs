using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Services.Services
{
    public class InvoiceService : IGenericService<Invoice>
    {
        private IInvoiceRepository _invoiceRepository;


        public InvoiceService(EnlabHotelContext context)
        {
            _invoiceRepository = new InvoiceRepository(context);
        }

        public IList<Invoice> GetAll()
        {
            return _invoiceRepository.GetAll().ToList();
        }

        public Invoice Get(object id)
        {
            return _invoiceRepository.Get(id);
        }

        public void Add(Invoice client)
        {
            _invoiceRepository.Add(client);
            _invoiceRepository.Save();
        }

        public void Update(Invoice client)
        {
            _invoiceRepository.Update(client);
            _invoiceRepository.Save();
        }

        public void Delete(object clientId)
        {
            _invoiceRepository.Delete(clientId);
            _invoiceRepository.Save();
        }

        public int GetMaxId()
        {
            return _invoiceRepository.GetMaxId(_ => _.Id);
        }
    }
}
