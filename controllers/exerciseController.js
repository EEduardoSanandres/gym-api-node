const Exercise = require("../models/Exercise");

// Obtener todos los ejercicios
exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo ejercicio
exports.createExercise = async (req, res) => {
  try {
    const { name, description, muscleGroup, equipment } = req.body;
    const newExercise = new Exercise({ 
      name, 
      description, 
      muscleGroup, 
      equipment, 
      createdBy: req.user.id 
    });
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener un ejercicio por ID
exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Ejercicio no encontrado" });
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un ejercicio
exports.deleteExercise = async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ message: "Ejercicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
