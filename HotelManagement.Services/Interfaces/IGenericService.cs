using System.Collections.Generic;

namespace HotelManagement.Services.Interfaces
{
    public interface IGenericService<T> where T : class
    {
        void Add(T obj);

        List<T> GetAll();

        T Get(object id);

        void Delete(object id);

        void Update(T obj);
    }
}
