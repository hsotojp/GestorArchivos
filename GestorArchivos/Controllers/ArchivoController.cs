using GestorArchivos.Context;
using GestorArchivos.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GestorArchivos.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ArchivoController : ControllerBase
    {
        public readonly AppDbContext context;
        public ArchivoController(AppDbContext context) 
        {
            this.context = context;
        }
        // GET: api/<ArchivoController>
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                return Ok(context.archivo.Where(arc => arc.idUsuario == id).ToList());
            }
            catch (Exception e) 
            {
                return BadRequest(e.StackTrace);
            }
        }

        // POST api/<ArchivoController>
        [HttpPost]
        public IActionResult Post([FromForm(Name = "file")] List<IFormFile> files, [FromForm(Name ="idUsuario")]int idUsuario)
        {
            ResponseMessages resp = new ResponseMessages();
            List<Archivo> archivos = new List<Archivo>();
            try {
                foreach (var file in files) 
                {
                    //RUTA donde se almacenarán los documentos:
                    var filePath = "C:\\Users\\msotoj\\Source\\repos\\GestorArchivos\\GestorArchivos\\Archivos\\" + file.FileName;
                    using (var stream = System.IO.File.Create(filePath)) {
                        file.CopyToAsync(stream);
                    }
                    double tamanio = file.Length;
                    tamanio = tamanio / 1000000;
                    tamanio = Math.Round(tamanio, 2);

                    Archivo archivo = new Archivo();
                    archivo.extension = Path.GetExtension(file.FileName).Substring(1);
                    archivo.nombre = Path.GetFileNameWithoutExtension(file.FileName);
                    archivo.tamanio = (decimal)tamanio;
                    archivo.ubicacion = filePath;
                    archivo.idUsuario = idUsuario;
                    archivos.Add(archivo);

                }
                context.archivo.AddRange(archivos);
                context.SaveChanges();


                resp.codigo = "correcto";
                resp.mensaje = "Archivos cargados con éxito!";
                return Ok(resp);


            }
            catch (Exception ex) 
            {
                Console.WriteLine(ex);
                resp.codigo = "error";
                resp.mensaje = "Este usuario ya se encuentra registrado en la base de datos.";
                return Ok(resp);
            }
        }

        // POST api/bloquear
        [Route("eliminar")]
        [HttpPost]
        public IActionResult Post([FromForm] int idArchivo)
        {
            Archivo archivo = new Archivo();
            archivo = context.archivo.Find(idArchivo);

            context.archivo.Remove(archivo);
            context.SaveChanges();

            try {
                if (System.IO.File.Exists(archivo.ubicacion)) {
                    System.IO.File.Delete(archivo.ubicacion);
                }
            
            } catch (Exception e) {
                Console.WriteLine(e);
            }

            return Ok("Archivo Eliminado!");

        }

        // POST api/bloquear
        [Route("descargar")]
        [HttpPost]
        public IActionResult descargarArchivo([FromForm] int idArchivo)
        {
            Archivo archivo = new Archivo();
            archivo = context.archivo.Find(idArchivo);


            try
            {
                if (System.IO.File.Exists(archivo.ubicacion))
                {
                    System.IO.File.Delete(archivo.ubicacion);
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return Ok("Archivo Eliminado!");

        }

    }
}
