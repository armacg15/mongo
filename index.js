const express = require('express');
const session = require('express-session');
const mongoose = require('./config/database');
const path = require('path');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const recordRoutes = require('./routes/recordRoutes');
const authenticateToken = require('./middlewares/authMiddleware');

dotenv.config();

// Conexión a la base de datos
mongoose();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de vistas y directorio público
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: true,
  })
);

// Rutas
app.use('/auth', authRoutes);
app.use('/records', authenticateToken, recordRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// Manejo de errores básicos
app.use((req, res) => {
  res.status(404).send('<h1>404 - Página no encontrada</h1>');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
