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
        private DbSet<TEntity> _entities;


        public GenericRepository(EnlabHotelContext context)
        {  
            _context = context;
            _entities = _context.Set<TEntity>();
        }

        public virtual IList<TEntity> GetAll()
        {
            return _entities.ToList();
        }

        public virtual TEntity Get(int id)
        {
            return _entities.Find(id);
        }

        public virtual void Add(TEntity obj)
        {
            _entities.Add(obj);
        }

        public virtual void Update(TEntity obj)
        {
            _entities.Attach(obj);
            _context.Entry(obj).State = EntityState.Modified;
        }

        public virtual void Delete(int id)
        {
            TEntity existing = _entities.Find(id);
            _entities.Remove(existing);
        }

        public virtual void Save()
        {
            _context.SaveChanges();
        }

        public virtual int GetMaxId(Func<TEntity, int> columnSelector)
        {
            return _entities.Max(columnSelector);
        }
    }
}
