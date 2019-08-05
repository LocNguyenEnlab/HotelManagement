using System.Collections.Generic;
using System.Linq;
using HotelManagement.Entities.DataContext;
using HotelManagement.Entities.Model;
using HotelManagement.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelManagement.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceTypeController : ControllerBase
    {
        private readonly IServiceTypeService _service;


        public ServiceTypeController(IServiceTypeService service)
        {
            _service = service;
        }

        [HttpGet] 
        public IList<ServiceType> Get()
        {
            return _service.GetAll();
        }
    }
}