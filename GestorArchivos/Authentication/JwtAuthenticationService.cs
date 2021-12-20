using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace GestorArchivos.Authentication
{
    public class JwtAuthenticationService : IJwtAuthenticationService
    {
        private readonly string _key;

        public JwtAuthenticationService(string key)
        {
            _key = key;
        }
        public string Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password) || username != "demo" || password != "123456")
            {
                return null;
            }
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SuperSecretKEY2021."));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(_key);

            var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5000", //nombre del servidor que provee el Token
                    audience: "http://localhost:5000", //representa destinatarios validos
                    claims: new List<Claim>() {
                        new Claim(ClaimTypes.NameIdentifier,"Text"),
                        new Claim(ClaimTypes.Email,"correo"),
                        new Claim(ClaimTypes.Name, "nmomre")

                    }, //lista de roles
                    expires: DateTime.Now.AddMinutes(60), //indica dentro de cuanto expira el Token
                                                          //expires: DateTime.Now.AddSeconds(10), //indica dentro de cuanto expira el Token
                    signingCredentials: signinCredentials
                );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            //var token = tokenHandler.CreateToken(tokeOptions);

            return tokenString;
        }
    }
}
