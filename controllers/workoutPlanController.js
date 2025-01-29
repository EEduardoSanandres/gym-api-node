const WorkoutPlan = require("../models/WorkoutPlan");

// Obtener todos los planes de entrenamiento de un usuario
exports.getWorkoutPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find({ user: req.user.id }).populate("user").populate("weeks.days.exercises.exercise");
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo plan de entrenamiento
exports.createWorkoutPlan = async (req, res) => {
  try {
    const { name, weeks } = req.body;

    if (!name || !weeks || !Array.isArray(weeks)) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    const newPlan = new WorkoutPlan({
      user: req.user.id,
      name,
      weeks,
    });

    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un plan de entrenamiento
exports.updateWorkoutPlan = async (req, res) => {
  try {
    const plan = await WorkoutPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan de entrenamiento no encontrado" });
    }

    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const updatedPlan = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
