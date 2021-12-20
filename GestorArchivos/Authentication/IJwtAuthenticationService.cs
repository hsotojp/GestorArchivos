using GestorArchivos.Context;
using GestorArchivos.Models;

namespace GestorArchivos.Authentication
{
    public interface IJwtAuthenticationService
    {
        ResponseAuth Authenticate(string username, string password, AppDbContext context);
    }
}
