using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceManager.Core.DTO
{
    public class UtenteDTO
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public Boolean IsCanceled { get; set; }
        public string Role { get; set; }
    }
}
