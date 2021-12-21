using GestorArchivos.Authentication;
using GestorArchivos.Context;
using GestorArchivos.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GestorArchivos.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {

        private readonly ILogger<UsuarioController> _logger;
        private readonly IJwtAuthenticationService _authService;
        public readonly AppDbContext context;
        public UsuarioController(ILogger<UsuarioController> logger, IJwtAuthenticationService authService, AppDbContext context)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _authService = authService;
            this.context = context;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthModel user)
        {
            ResponseAuth respuesta = _authService.Authenticate(user.usuario, user.contrasenia, context);
            if (respuesta == null)
            {
                return Unauthorized();
            }

            return Ok(respuesta);
        }

        // GET api/<UsuarioController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Usuario user = new Usuario();
            user = context.usuario.Find(id);
            return Ok(user);
        }

        // POST api/bloquear
        [Route("bloquear")]
        [HttpPost]
        public IActionResult Post([FromForm] int idUsuario)
        {
            Usuario user = new Usuario();
            user = context.usuario.Find(idUsuario);
            user.vigente = "N";

            context.usuario.Update(user);
            context.SaveChanges();
            return Ok("Usuario bloqueado!");

        }


        // POST api/registrar
        [Route("registrar")]
        [AllowAnonymous]
        [HttpPost]
        public IActionResult RegistrarUsuario([FromBody] Usuario nuevoUsuario)
        {
            ResponseMessages resp = new ResponseMessages();
            var usuario = context.usuario.FirstOrDefault(usr => usr.usuario == nuevoUsuario.usuario);
            if (usuario != null)
            {
                resp.codigo = "error";
                resp.mensaje = "Este usuario ya se encuentra registrado en la base de datos.";
            }
            else {

                context.usuario.Add(nuevoUsuario);
                context.SaveChanges();
                resp.codigo = "correcto";
                resp.mensaje = "Este usuario ya se encuentra registrado en la base de datos.";
            }

            return Ok(resp);

        }


        // POST api/registrar
        [Route("modificar")]
        [HttpPost]
        public IActionResult ModificarUsuario([FromBody] Usuario usuarioModificado)
        {
            context.usuario.Update(usuarioModificado);
            context.SaveChanges();
            ResponseMessages resp = new ResponseMessages();
            resp.codigo = "correcto";
            resp.mensaje = "Usuario correctamente actualizado.";
            return Ok(resp);

        }

    }
}
