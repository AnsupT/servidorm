import express from "express";
const router = express.Router();
import Usuario from "../model/usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "clave_secreta_segura";

// GET: Obtener todos
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Crear un usuario
router.post('/', async (req, res) => {
    try {
    const { nombre, telefono, email, password } = req.body;

    // Validar datos básicos
    if (!nombre || !telefono || !email || !password) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    // Verificar si ya existe un usuario con ese email
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    // Crear y guardar el usuario
    const nuevoUsuario = new Usuario({ nombre, telefono, email, password });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario creado correctamente", usuario: nuevoUsuario });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado" });

    const coincide = await Usuario.findOne({ password });
    if (!coincide) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    // Crear token
    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ mensaje: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

export default router;