using System;
using System.Collections.Generic;

namespace HotelManagement.Repository.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        IList<T> GetAll();
        T Get(object id);
        void Add(T obj);
        void Update(T obj);
        void Delete(object id);
        void Save();
        int GetMaxId(Func<T, decimal> columnSelector);
    }
}
