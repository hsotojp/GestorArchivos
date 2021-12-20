using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using GestorArchivos.Context;
using GestorArchivos.Models;
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
        public ResponseAuth Authenticate(string username, string password, AppDbContext context)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                return null;
            }

            var usuario = context.usuario.FirstOrDefault(usr => usr.usuario == username && usr.contrasenia == password && usr.vigente == "S") ;

            if (usuario == null)
                return null;


            ResponseAuth respuesta = new ResponseAuth();

            respuesta.correo = usuario.correo;
            respuesta.usuario = usuario.usuario;
            respuesta.nombre = usuario.nombre;
            respuesta.idUsuario = usuario.idUsuario;

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

            respuesta.token = tokenString;

            return respuesta;
        }
    }
}
