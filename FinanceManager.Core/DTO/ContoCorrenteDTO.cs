using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceManager.Core.DTO
{
    public class ContoCorrenteDTO
    {
        public int ContoId { get; set; }
        public int UserId { get; set; }
        public decimal? TotalAmount { get; set; }
        public bool IsCanceled { get; set; }
        public string NameConto { get; set; }
        public DateTime? WhenCreated { get; set; }
    }
}
