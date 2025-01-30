const mongoose = require("mongoose");
const Exercise = require("../models/Exercise"); // Asegúrate de que la ruta sea correcta
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const exercisesFilePath = path.join(__dirname, "../data/exercises.json");
const initialExercises = JSON.parse(fs.readFileSync(exercisesFilePath, "utf-8"));

// Función para insertar datos si la colección está vacía
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const count = await Exercise.countDocuments();
    if (count === 0) {
      console.log("🚀 No exercises found. Seeding initial data...");
      await Exercise.insertMany(initialExercises);
      console.log("✅ Exercises added successfully!");
    } else {
      console.log("⚠️ Exercises already exist. Skipping seed.");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    mongoose.connection.close();
  }
};

// Ejecutar el seeding manualmente si se llama este archivo
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
