using HotelManagement.Entities.DataContext;
using HotelManagement.Repository.Interfaces;
using HotelManagement.Repository.Repository;
using HotelManagement.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace HotelManagement.Services.Services
{
    public class GenericService<TEntity> : IGenericService<TEntity> where TEntity : class
    {
        private IGenericRepository<TEntity> _repository;


        public GenericService(EnlabHotelContext context)
        {
            _repository = new GenericRepository<TEntity>(context);
        }

        public virtual void Add(TEntity obj)
        {
            _repository.Add(obj);
            _repository.Save();
        }

        public virtual void Delete(int id)
        {
            _repository.Delete(id);
            _repository.Save();
        }

        public virtual TEntity Get(int id)
        {
            return _repository.Get(id);
        }

        public virtual IList<TEntity> GetAll()
        {
            return _repository.GetAll();
        }

        public virtual void Update(TEntity obj)
        {
            _repository.Update(obj);
            _repository.Save();
        }
    }
}
