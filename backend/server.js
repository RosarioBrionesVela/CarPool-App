require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function conectarDB() {
  try {
    await client.connect();
    db = client.db('Carpool');
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (e) {
    console.error('❌ Error conectando a MongoDB:', e);
  }
}
conectarDB();

// --- USUARIOS ---
app.post('/api/register', async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;
    const correoNormalizado = correo.toLowerCase().trim();
    
    const usuarioExistente = await db.collection('usuarios').findOne({ correo: correoNormalizado });
    if (usuarioExistente) return res.status(400).json({ error: 'El correo ya está registrado' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoUsuario = { nombre, correo: correoNormalizado, password: passwordHash, telefono: '' };
    const resultado = await db.collection('usuarios').insertOne(nuevoUsuario);
    
    res.status(201).json({ 
      mensaje: 'Usuario creado', 
      usuario: { id: resultado.insertedId, nombre, correo: correoNormalizado } 
    });
  } catch (e) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { correo, password } = req.body;
    const correoNormalizado = correo.toLowerCase().trim();
    
    const usuario = await db.collection('usuarios').findOne({ correo: correoNormalizado });
    if (!usuario) return res.status(400).json({ error: 'Credenciales incorrectas' });

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) return res.status(400).json({ error: 'Credenciales incorrectas' });

    res.json({ 
      mensaje: 'Login exitoso', 
      usuario: { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo, telefono: usuario.telefono } 
    });
  } catch (e) {
    res.status(500).json({ error: 'Error en el login' });
  }
});

// Actualizar perfil
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono } = req.body;

    const resultado = await db.collection('usuarios').updateOne(
      { _id: new ObjectId(id) },
      { $set: { nombre, telefono } }
    );

    if (resultado.matchedCount === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Perfil actualizado' });
  } catch (e) {
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

// --- VIAJES ---
app.get('/api/viajes', async (req, res) => {
  try {
    // Solo traemos los que no estén completados
    const viajes = await db.collection('viajes').find({ estado: { $ne: 'completado' } }).toArray();
    res.json(viajes);
  } catch (e) {
    res.status(500).json({ error: 'Error al obtener viajes' });
  }
});

app.post('/api/viajes', async (req, res) => {
  try {
    const nuevoViaje = { ...req.body, estado: 'disponible' };
    const resultado = await db.collection('viajes').insertOne(nuevoViaje);
    res.status(201).json({ mensaje: 'Viaje publicado', id: resultado.insertedId });
  } catch (e) {
    res.status(500).json({ error: 'Error al publicar viaje' });
  }
});

// Completar viaje
app.put('/api/viajes/:id/completar', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await db.collection('viajes').updateOne(
      { _id: new ObjectId(id) },
      { $set: { estado: 'completado' } }
    );
    if (resultado.matchedCount === 0) return res.status(404).json({ error: 'Viaje no encontrado' });
    
    // Opcional: Eliminamos las reservas de este viaje para que no queden en "Reservados"
    await db.collection('reservas').deleteMany({ viajeId: id });

    res.json({ mensaje: 'Viaje completado' });
  } catch (e) {
    res.status(500).json({ error: 'Error al completar viaje' });
  }
});

// --- RESERVAS ---
app.post('/api/reservas', async (req, res) => {
  try {
    const { usuarioId, viajeId, conductor, origen, destino, fecha, precio } = req.body;
    
    const reservaExistente = await db.collection('reservas').findOne({ usuarioId, viajeId });
    if (reservaExistente) return res.status(400).json({ error: 'Ya tienes una reservación para este viaje' });

    const nuevaReserva = { 
      usuarioId, viajeId, conductor, origen, destino, fecha, precio, 
      estado: 'Confirmado', 
      fechaReserva: new Date() 
    };
    await db.collection('reservas').insertOne(nuevaReserva);
    res.status(201).json({ mensaje: 'Reserva confirmada' });
  } catch (e) {
    res.status(500).json({ error: 'Error al reservar' });
  }
});

app.get('/api/reservas/:usuarioId', async (req, res) => {
  try {
    const reservas = await db.collection('reservas')
      .find({ usuarioId: req.params.usuarioId })
      .toArray();
    res.json(reservas);
  } catch (e) {
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

// Cancelar reserva
app.delete('/api/reservas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await db.collection('reservas').deleteOne({ _id: new ObjectId(id) });
    if (resultado.deletedCount === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json({ mensaje: 'Reserva cancelada' });
  } catch (e) {
    res.status(500).json({ error: 'Error al cancelar reserva' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend corriendo en el puerto ${PORT}`);
}); 