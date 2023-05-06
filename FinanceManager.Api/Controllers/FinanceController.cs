using Core.Utils;
using FinanceManager.Api.Controllers;
using FinanceManager.Core;
using FinanceManager.Core.DTO;
using It.Plugin.IDC.Api.Core.Results;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace FinanceManager.Api
{
    public class FinanceController : BaseController
    {
        [RoutePrefix("api/data")]
        public class PluginController : BaseController
        {
            protected FinanceService _service = new FinanceService();

            [Route("login")]
            [HttpPost]
            public IHttpActionResult Login([FromBody] LoginRequestDTO loginUser)
            {
                try
                {
                    CookieDTO result = null;
                    LoginDTO user = _service.Login(loginUser);
                    if (user != null)
                    {
                        result = new CookieDTO()
                        {
                            Token = CipherUtils.EncryptPublic(JsonConvert.SerializeObject(user)),
                            CompleteName = string.Format("{0} {1}", user.Name, user.Lastname),
                            UserId = user.UserId,
                            Role = user.Role
                        };
                    }

                    return ApiJsonResult.Ok<CookieDTO>(Request, result);

                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }


            [Route("getInfoConto/{userId}")]
            [HttpGet]
            public IHttpActionResult GetInfoConto(int userId)
            {
                try
                {

                    ContoCorrenteDTO result = _service.getInfoConto(userId);

                    return ApiJsonResult.Ok<ContoCorrenteDTO>(Request, result);

                }
                catch (Exception ex)
                {
                    return ApiJsonResult.InternalServerError(Request, ex);
                }

            }

            [Route("getAllCategoriesExit")]
            [HttpGet]
            public IHttpActionResult GetAllCategories()
            {
                try
                {

                    List<CategoryDTO> result = _service.GetAllCategoriesExit();

                    return ApiJsonResult.Ok<List<CategoryDTO>>(Request, result);

                }
                catch (Exception ex)
                {
                    return ApiJsonResult.InternalServerError(Request, ex);
                }

            }

            [Route("addCategory")]
            [HttpPost]
            public IHttpActionResult addCategory([FromBody] CategoryDTO cat)
            {
                try
                {
                    bool result = _service.addCategory(cat);
                    return ApiJsonResult.Ok<bool>(Request, result);

                }
                catch (Exception ex)
                {
                    return ApiJsonResult.InternalServerError(Request, ex);
                }

            }


            [Route("getAllCategoriesEntry")]
            [HttpGet]
            public IHttpActionResult GetAllCategoriesEntry()
            {
                try
                {

                    List<CategoryDTO> result = _service.GetAllCategoriesEntry();

                    return ApiJsonResult.Ok<List<CategoryDTO>>(Request, result);

                }
                catch (Exception ex)
                {
                    return ApiJsonResult.InternalServerError(Request, ex);
                }

            }

            [Route("getOperationsForCategory/{userId}/{type}")]
            [HttpGet]
            public IHttpActionResult getOperationsForCategory(int userId, string type)
            {
                try
                {

                    List<MovimentoForCategoryDTO> result = _service.GetOperationsForCategory(userId, type);

                    return ApiJsonResult.Ok<List<MovimentoForCategoryDTO>>(Request, result);

                }
                catch (Exception ex)
                {
                    return ApiJsonResult.InternalServerError(Request, ex);
                }

            }

            [Route("addOperation")]
            [HttpPost]
            public IHttpActionResult addOperation([FromBody] MovimentoDTO mov)
            {
                try
                {
                    bool result = _service.AddOperation(mov);
                    return ApiJsonResult.Ok<bool>(Request, result);

                }
                catch (Exception ex)
                {
                    return ApiJsonResult.InternalServerError(Request, ex);
                }

            }

            [Route("getDetailOperationForCategory/{userId}/{type}/{catId}")]
            [HttpGet]
            public IHttpActionResult getDetailOperationForCategory(int userId, string type, int catId)
            {
                try
                {

                    List<DetailOperationDTO> result = _service.GetDetailOperationForCategory(userId, type, catId);

                    return ApiJsonResult.Ok<List<DetailOperationDTO>>(Request, result);

                }
                catch (Exception ex)
                {
                    return ApiJsonResult.InternalServerError(Request, ex);
                }

            }

            [Route("deleteOperation/{usciteId}")]
            [HttpGet]
            public HttpResponseMessage DeleteOperation(int usciteId)
            {
                try
                {
                    var result = _service.DeleteOperation(usciteId);
                    return Request.CreateResponse(System.Net.HttpStatusCode.OK, result);
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }

            [Route("getAllOperation")]
            [HttpGet]
            public IHttpActionResult getAllOperation()
            {
                try
                {

                    List<MovimentoDTO> result = _service.GetAllOperation();

                    return ApiJsonResult.Ok<List<MovimentoDTO>>(Request, result);
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }

            [Route("getAllUsers")]
            [HttpGet]
            public IHttpActionResult getAllUsers()
            {
                try
                {

                    List<UtenteDTO> result = _service.GetAllUsers();

                    return ApiJsonResult.Ok<List<UtenteDTO>>(Request, result);
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }

            [Route("saveUser")]
            [HttpPost]
            public IHttpActionResult saveUsers([FromBody] UtenteDTO user)
            {
                try
                {

                    bool result = _service.SaveUsers(user);

                    return ApiJsonResult.Ok<bool>(Request, result);
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }

            [Route("deleteUser/{userId}")]
            [HttpGet]
            public HttpResponseMessage deleteUser(int userId)
            {
                try
                {

                    bool result = _service.DeleteUser(userId);

                    return Request.CreateResponse(System.Net.HttpStatusCode.OK, result);
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }


        }
    }
}
