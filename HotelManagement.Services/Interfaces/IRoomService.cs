﻿using HotelManagement.Entities.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace HotelManagement.Services.Interfaces
{
    public interface IRoomService : IGenericService<Room>
    {
        Room Get(string roomName);

        IList<Room> GetRoomsBySearchKey(string searchKey);
    }
}
