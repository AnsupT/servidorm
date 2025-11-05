import mongoose from "mongoose";


const productoSchema = new mongoose.Schema({
  nombre: { 
    type: String,       // Tipo de dato
    required: true,     // Campo obligatorio
    trim: true          // Quita espacios al inicio/fin
  },
  categoria: { 
    type: String       // Tipo de dato
    
  },
  talla: { 
    type: String       // Tipo de dato
    
  },
  color: { 
    type: String      // Tipo de dato
    
  },
  precio: { 
    type: String       // Tipo de dato
    
  },
  stock: { 
    type: String      // Tipo de dato
    
  },
  descripcion: { 
    type: String 
    
  },
  imagen: { 
    type: String 
    
  },
});




/**
 * 4) Creamos y exportamos el modelo.
 */
//export default mongoose.model("Usuario", usuarioSchema);

const Producto = mongoose.model("producto", productoSchema, "producto");
export default Producto;
