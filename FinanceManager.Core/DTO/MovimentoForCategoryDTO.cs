using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceManager.Core.DTO
{
    public class MovimentoForCategoryDTO
    {
        public int UserId { get; set; }
        public int? CategoryId { get; set; }
        public int? ContoId { get; set; }
        public decimal? TotalAmount { get; set; }
        public string CategoryName { get; set; }
        public string Type { get; set; }
        public bool? IsCanceled { get; set; }
    }
}
