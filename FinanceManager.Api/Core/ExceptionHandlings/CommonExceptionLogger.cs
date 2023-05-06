using FinanceManager.Api.Core;
using System.Web.Http.ExceptionHandling;

namespace It.Plugin.IDC.Api.Core.ExceptionHandlings
{
    public class CommonExceptionLogger : ExceptionLogger
    {
        public override void Log(ExceptionLoggerContext context)
        {
            ApiManager.GetLogger(context.Request).Error("Unhandled Exception", context.Exception);
        }
    }
}