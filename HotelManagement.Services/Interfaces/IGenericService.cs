using System.Collections.Generic;

namespace HotelManagement.Services.Interfaces
{
    public interface IGenericService<TEntity> where TEntity : class
    {
        void Add(TEntity obj);

        IList<TEntity> GetAll();

        TEntity Get(int id);

        void Delete(int id);

        void Update(TEntity obj);
    }
}
