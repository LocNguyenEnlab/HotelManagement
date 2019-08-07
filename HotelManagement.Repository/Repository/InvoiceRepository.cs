using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Repository.Repository
{
    public class InvoiceRepository : GenericRepository<Invoice>, IInvoiceRepository
    {
        public InvoiceRepository(EnlabHotelContext context) : base(context)
        {
        }

        public override IList<Invoice> GetAll()
        {
            return _context.Invoice.Include(_ => _.Clients)
                .Include(_ => _.ServicesOfInvoice)
                .ThenInclude(_ => _.Service)
                .ToList();
        }

        public Invoice Get(string roomName)
        {
            var invoices = _context.Invoice.Include(_ => _.Clients)
                .ThenInclude(_ => _.Room)
                .Include(_ => _.ServicesOfInvoice)
                .ThenInclude(_ => _.Service)
                .ToList();
            foreach (var invoice in invoices)
            {
                foreach (var client in invoice.Clients)
                {
                    if (client.RoomName == roomName)
                    {
                        return invoice;
                    }
                }
            }
            return null;
        }
    }
}
