using HotelManagement.Entities.DataContext;
using HotelManagement.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Repository.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private EnlabHotelContext _context;
        private DbSet<T> _table;

        public GenericRepository(EnlabHotelContext context)
        {  
            _context = context;
            _table = _context.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return _table.ToList();
        }

        public T Get(int id)
        {
            return _table.Find(id);
        }

        public void Add(T obj)
        {
            _table.Add(obj);
        }

        public void Update(T obj)
        {
            _table.Attach(obj);
            _context.Entry(obj).State = EntityState.Modified;
        }

        public void Delete(object id)
        {
            T existing = _table.Find(id);
            _table.Remove(existing);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public int GetMaxId(Func<T, decimal> columnSelector)
        {
            return (int)_table.Max(columnSelector);
        }
    }
}
