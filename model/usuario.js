// models/usuario.js
import mongoose from "mongoose";

/**
 * 1) Definimos el esquema del modelo: campos, tipos y validaciones.
 */
const usuarioSchema = new mongoose.Schema({
  nombre: { 
    type: String,       // Tipo de dato
    required: true,     // Campo obligatorio
    trim: true          // Quita espacios al inicio/fin
  },
  telefono: { 
    type: String 
   
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,       // Índice único en la colección
    lowercase: true,    // Almacena todo en minúsculas
    trim: true
  },
  password: { 
    type: String, 
     trim: true,
   
  }
});



/**
 * 4) Creamos y exportamos el modelo.
 */
//export default mongoose.model("Usuario", usuarioSchema);


const Usuario = mongoose.model("usuario", usuarioSchema, "usuario");
export default Usuario;
