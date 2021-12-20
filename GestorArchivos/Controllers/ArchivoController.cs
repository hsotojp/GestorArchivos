using GestorArchivos.Context;
using GestorArchivos.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

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
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.usuario.ToList());
            }
            catch (Exception e) 
            {
                return BadRequest(e.StackTrace);
            }
        }

        // POST api/<ArchivoController>
        [HttpPost]
        public void Post([FromForm] List<IFormFile> files, int idUsuario)
        {
            List<Archivo> archivos = new List<Archivo>();
            try {
                foreach (var file in files) 
                {
                    //RUTA donde se almacenarán los documentos:
                    var filePath = "C:\\Users\\msotoj\\Source\\repos\\GestorArchivos\\GestorArchivos\\Archivos\\"+idUsuario+"\\" + file.FileName;
                    using (var stream = System.IO.File.Create(filePath)) {
                        file.CopyToAsync(stream);
                    }
                    double tamanio = file.Length;
                    tamanio = tamanio / 1000000;
                    tamanio = Math.Round(tamanio, 2);

                    Archivo archivo = new Archivo();
                    archivo.extension = Path.GetExtension(file.FileName).Substring(1);
                    archivo.nombre = Path.GetFileNameWithoutExtension(file.FileName);
                    archivo.tamanio = tamanio;
                    archivo.ubicacion = filePath;
                    archivo.idUsuario = idUsuario;
                    archivos.Add(archivo);

                }
                context.archivo.AddRange(archivos);
                context.SaveChanges();
            }catch (Exception ex) 
            {
                Console.WriteLine(ex);
            }
        }
    }
}
