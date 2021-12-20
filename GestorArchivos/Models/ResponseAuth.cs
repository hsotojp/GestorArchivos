using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestorArchivos.Models
{
    public class ResponseAuth
    {
        public int idUsuario { get; set; }
        public string token { get; set; }
        public string nombre { get; set; }
        public string correo { get; set; }
        public string usuario { get; set; }
    }
}
