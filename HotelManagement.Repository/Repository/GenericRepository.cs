using HotelManagement.Entities.DataContext;
using HotelManagement.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Repository.Repository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        protected EnlabHotelContext _context;
        private DbSet<TEntity> Entities;


        public GenericRepository(EnlabHotelContext context)
        {  
            _context = context;
            Entities = _context.Set<TEntity>();
        }

        public virtual IList<TEntity> GetAll()
        {
            return Entities.ToList();
        }

        public TEntity Get(object id)
        {
            return Entities.Find(id);
        }

        public void Add(TEntity obj)
        {
            Entities.Add(obj);
        }

        public void Update(TEntity obj)
        {
            Entities.Attach(obj);
            _context.Entry(obj).State = EntityState.Modified;
        }

        public void Delete(object id)
        {
            TEntity existing = Entities.Find(id);
            Entities.Remove(existing);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public int GetMaxId(Func<TEntity, decimal> columnSelector)
        {
            return (int)Entities.Max(columnSelector);
        }
    }
}
