import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuariorutas.js";
import productoRoutes from "./routes/productorutas.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));

// Rutas básicas
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

// Rutas
app.use("/api/usuarios", usuarioRoutes);

app.use("/api/productos", productoRoutes);


// Escuchar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
