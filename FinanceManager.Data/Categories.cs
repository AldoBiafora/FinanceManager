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
    using System.Collections.Generic;
    
    public partial class Categories
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public bool IsCanceled { get; set; }
        public string Type { get; set; }
        public byte[] Image { get; set; }
    }
}