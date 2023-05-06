using FinanceManager.Core.DTO;
using FinanceManager.Core.Helpers;
using FinanceManager.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceManager.Core
{
    public class FinanceService
    {
        public LoginDTO Login(LoginRequestDTO loginUser)
        {
            try
            {
                LoginDTO result = null;
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {
                    if(ctx.Users.Any(i => i.Email.Equals(loginUser.Username) && i.IsCanceled == false))
                    {
                        Users user = ctx.Users.FirstOrDefault(i => i.Email.Equals(loginUser.Username));
                        // inserire cript password
                        if (user.Password.Equals(loginUser.Password))
                        {
                            result = new LoginDTO
                            {
                                Name = user.Name,
                                Lastname = user.LastName,
                                Email = user.Email,
                                UserId = user.UserId,
                                Role = user.Role
                            };
                        }
                    }
                }
                return result;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }


        public ContoCorrenteDTO getInfoConto(int userId)
        {
            try
            {
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {
                    ContoCorrenteDTO result;
                    var conto = ctx.ContoCorrente.FirstOrDefault(i => i.UserId == userId);
                    result = new ContoCorrenteDTO
                    {
                        UserId = userId,
                        ContoId = conto.ContoId,
                        TotalAmount = conto.TotalAmount,
                        IsCanceled = conto.IsCanceled,
                        NameConto = conto.NameContoCorrente,
                        WhenCreated = conto.WhenCreated
                    };
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<CategoryDTO> GetAllCategoriesExit()
        {
            try
            {
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {
                    List<CategoryDTO> result;
                    result = ctx.Categories.Select(i => new CategoryDTO()
                    {
                        CategoryId = i.CategoryId,
                        Name = i.Name,
                        IsCanceled = i.IsCanceled,
                        Type = i.Type,
                        Image = i.Image
                    }).Where(i => i.Type.Equals(AppConstants.CATEGORY_EXIT) && i.IsCanceled == false)
                        .ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool addCategory(CategoryDTO cat)
        {
            try
            {
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {
                    bool result = false;
                    Categories category;
                    if(cat != null)
                    {
                        category = new Categories()
                        {
                            CategoryId = 0,
                            Name = cat.Name,
                            IsCanceled = false,
                            Type = cat.Type
                        };

                        ctx.Categories.Add(category);
                        ctx.SaveChanges();
                        result = true;
                    }
                    
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<CategoryDTO> GetAllCategoriesEntry()
        {
            try
            {
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {
                    List<CategoryDTO> result;
                    result = ctx.Categories.Select(i => new CategoryDTO()
                    {
                        CategoryId = i.CategoryId,
                        Name = i.Name,
                        IsCanceled = i.IsCanceled,
                        Type = i.Type
                    }).Where(i => i.Type.Equals(AppConstants.CATEGORY_ENTRY) && i.IsCanceled == false)
                        .ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<MovimentoForCategoryDTO> GetOperationsForCategory(int userId, string type)
        {
            try
            {
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {
                    List<MovimentoForCategoryDTO> result;
                    result = ctx.SP_OPERATION_FOR_CATEGORY(userId, type).Where(i => i.IsCanceled == false).Select(i => new MovimentoForCategoryDTO()
                    {
                        UserId = i.UserId,
                        ContoId = i.ContoId,
                        TotalAmount = i.TotalAmount,
                        CategoryName = i.Name,
                        CategoryId = i.CategoryId,
                        Type = i.Type,
                        IsCanceled = i.IsCanceled
                    }).ToList(); 
                    return result;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public bool AddOperation(MovimentoDTO movimentoParam)
        {
            try
            {
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {
                    bool result = false;
                    Movimenti movimento;
                    ContoCorrente contoNow = ctx.ContoCorrente.FirstOrDefault(i => i.ContoId == movimentoParam.ContoId);
                    if (movimentoParam != null)
                    {
                        movimento = new Movimenti()
                        {
                            UsciteId = movimentoParam.UsciteId,
                            UserId = movimentoParam.UserId,
                            ContoId = movimentoParam.ContoId,
                            CategoryId = movimentoParam.CategoryId,
                            TotalAmount = movimentoParam.TotalAmount,
                            IsCanceled = false,
                            WhenCreated = movimentoParam.WhenCreated,
                            Note = movimentoParam.Note,
                            Type = movimentoParam.Type
                        };
                        ctx.Movimenti.Add(movimento);
                        if (movimento.Type.Equals(AppConstants.CATEGORY_EXIT))
                        {
                            contoNow.TotalAmount -= movimento.TotalAmount;
                            ctx.SaveChanges();
                            //deleteOperationContoCorrente(movimentoParam.TotalAmount, movimentoParam.ContoId);
                        }
                        if (movimento.Type.Equals(AppConstants.CATEGORY_ENTRY))
                        {
                            contoNow.TotalAmount += movimento.TotalAmount;
                            ctx.SaveChanges();
                            //addOperationContoCorrente(movimentoParam.TotalAmount, movimentoParam.ContoId);
                        }
                        result = true;
                    }
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DetailOperationDTO> GetDetailOperationForCategory(int userId, string type, int catId)
        {
            try
            {
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {
                    List<DetailOperationDTO> result;
                    string catName = ctx.Categories.FirstOrDefault(i => i.CategoryId == catId).Name;
                    result = ctx.Movimenti.Where(r => r.UserId == userId && r.Type.Equals(type) && r.IsCanceled == false && catId == r.CategoryId).Select(i => new DetailOperationDTO()
                    {
                        UserId = i.UserId,
                        ContoId = i.ContoId,
                        UsciteId = i.UsciteId,
                        CategoryName = catName,
                        Type = i.Type,
                        IsCanceled = i.IsCanceled,
                        Note = i.Note,
                        WhenCreated = i.WhenCreated,
                        TotalAmount = i.TotalAmount
                    }).ToList();
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteOperation(int uscitaId)
        {
            try
            {
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {
                    bool result = false;
                    Movimenti mov = ctx.Movimenti.FirstOrDefault(i => i.UsciteId == uscitaId);
                    ContoCorrente contoNow = ctx.ContoCorrente.FirstOrDefault(i => i.ContoId == mov.ContoId);
                    if (mov != null)
                    {              
                        if (mov.Type.Equals(AppConstants.CATEGORY_EXIT))
                        {
                            contoNow.TotalAmount += mov.TotalAmount;
                            mov.IsCanceled = true;
                            ctx.SaveChanges();
                            //addOperationContoCorrente(mov.TotalAmount, mov.ContoId);
                        }
                        if (mov.Type.Equals(AppConstants.CATEGORY_ENTRY))
                        {
                            contoNow.TotalAmount -= mov.TotalAmount;
                            mov.IsCanceled = true;
                            ctx.SaveChanges();
                            //deleteOperationContoCorrente(mov.TotalAmount, mov.ContoId);
                        }
                        result = true;
                    }
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<MovimentoDTO> GetAllOperation()
        {
            try
            {
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {
                  
                    List<MovimentoDTO> result = new List<MovimentoDTO>();
                    result = ctx.Movimenti.Where(i => i.IsCanceled == false).Select(r => new MovimentoDTO()
                    {
                        UsciteId = r.UsciteId,
                        UserId = r.UserId,
                        ContoId = r.ContoId,
                        CategoryId = r.CategoryId,
                        TotalAmount = r.TotalAmount,
                        IsCanceled = r.IsCanceled,
                        WhenCreated = r.WhenCreated,
                        Note = r.Note,
                        Type = r.Type
                    }).OrderByDescending(i => i.WhenCreated).ToList();
                    foreach(var res in result)
                    {
                        Categories cat = ctx.Categories.FirstOrDefault(i => i.CategoryId == res.CategoryId);
                        res.CategoryName = cat.Name;
                    }
                    //string catName = ctx.Categories.Where(i => i.CategoryId == result.Find(r => r.CategoryId == i.CategoryId).CategoryId).Select(i => i.Name).ToString();
                    return result;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public List<UtenteDTO> GetAllUsers()
        {
            try
            {
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {

                    List<UtenteDTO> result = new List<UtenteDTO>();
                    result = ctx.Users.Where(i => i.IsCanceled == false).Select(i => new UtenteDTO()
                    {
                        UserId = i.UserId,
                        Username = i.UserName,
                        Email = i.Email,
                        Role = i.Role,
                    }).ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool SaveUsers(UtenteDTO user)
        {
            try
            {
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {                   
                    Users result = ctx.Users.FirstOrDefault(i => i.UserId == user.UserId);
                    if(result == null)
                    {
                        result = new Users()
                        {
                            UserName = user.Username,
                            Email = user.Email,
                            IsCanceled = false,
                            Role = user.Role
                        };
                        ctx.Users.Add(result);
                    }
                    result.UserName = user.Username;
                    result.Email = user.Email;
                    result.Role = user.Role;
                    ctx.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteUser(int userId)
        {
            try
            {
                using (FinanceManagerEntities ctx = new FinanceManagerEntities())
                {
                    Users result = ctx.Users.FirstOrDefault(i => i.UserId == userId);
                    result.IsCanceled = true;
                    result.CanceledOn = DateTime.Now;
                    ctx.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }





    }
}
