using HotelManagement.Entities.Model;
using Microsoft.EntityFrameworkCore;

namespace HotelManagement.Entities.DataContext
{
    public class EnlabHotelContext : DbContext
    { 
        public DbSet<Client> Client { get; set; }

        public DbSet<Invoice> Invoice { get; set; }

        public DbSet<Room> Room { get; set; }

        public DbSet<Service> Service { get; set; }

        public DbSet<ServiceType> ServiceType { get; set; }

        public DbSet<ServiceOfInvoice> ServiceOfInvoice { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost\SQLEXPRESS;Database=EnlabHotel;Trusted_Connection=True;");
        }
    }
}
