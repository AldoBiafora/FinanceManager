//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FinanceManager.Data
{
    using System;
    
    public partial class SP_OPERATION_FOR_CATEGORY_Result
    {
        public int UserId { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public Nullable<int> ContoId { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public Nullable<bool> IsCanceled { get; set; }
        public Nullable<int> NumberOperation { get; set; }
    }
}
