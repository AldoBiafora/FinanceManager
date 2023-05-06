using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceManager.Core.DTO
{
    public class DetailOperationDTO
    {
        public int UserId { get; set; }
        public int ContoId { get; set; }
        public int UsciteId { get; set; }
        public string CategoryName { get; set; }
        public string Type { get; set; }
        public bool IsCanceled { get; set; }
        public string Note { get; set; }
        public DateTime WhenCreated { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
