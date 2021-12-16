using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GestorArchivos.Models
{
    public class Usuario
    {
        [Key]
        public int idUsuario { get; set; }
        public string usuario { get; set; }
        public string contrasenia { get; set; }
        public string vigente { get; set; }
    }
}
