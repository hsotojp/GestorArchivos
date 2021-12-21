using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GestorArchivos.Models
{
    public class Archivo
    {
        [Key]
        public int idArchivo { get; set; }
        public string nombre { get; set; }
        public string extension { get; set; }
        public decimal tamanio { get; set; }
        public string ubicacion { get; set; }
        public int idUsuario { get; set; }

    }
}
