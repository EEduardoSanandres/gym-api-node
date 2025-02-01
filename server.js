const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const swaggerDocs = require("./config/swagger");
const seedDatabase = require("./scripts/seedDatabase");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/exercises", require("./routes/exerciseRoutes"));
app.use("/api/workout-plans", require("./routes/workoutPlanRoutes"));
app.use("/api/goals", require("./routes/goalRoutes")); 
app.use("/api/achievements", require("./routes/achievementRoutes")); 
app.use("/api/meals", require("./routes/mealRoutes")); 
app.use("/api/measurements", require("./routes/measurementRoutes")); 
app.use("/api/progress", require("./routes/progressRoutes")); 
app.use("/api/routines", require("./routes/routineRoutes")); 
app.use("/api/workout-logs", require("./routes/workoutLogRoutes")); 

swaggerDocs(app); // Asegúrate de llamar a esta función para activar Swagger

// Función para inicializar la base de datos y luego iniciar el servidor
const startServer = async () => {
  try {
    await connectDB(); // Conectar a MongoDB
    console.log("✅ Connected to MongoDB");

    await seedDatabase(); // Poblar la base de datos si está vacía

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  } catch (error) {
    console.error("❌ Error initializing server:", error);
    process.exit(1);
  }
};

// Iniciar el servidor solo después de conectar con la base de datos
startServer();