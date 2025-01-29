const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const swaggerDocs = require('./config/swagger');

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/exercises', require('./routes/exerciseRoutes'));
app.use('/api/workout-plans', require('./routes/workoutPlanRoutes'));

// Documentación Swagger
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
