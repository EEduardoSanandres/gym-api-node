const Goal = require("../models/Goal");

// Obtener todas las metas de un usuario
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).populate("user");
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva meta
exports.createGoal = async (req, res) => {
  try {
    const { type, targetValue, deadline } = req.body;

    if (!type || !['weightLoss', 'muscleGain', 'endurance', 'strength'].includes(type)) {
      return res.status(400).json({ message: "Tipo de meta inválido" });
    }

    if (!targetValue || typeof targetValue !== "number") {
      return res.status(400).json({ message: "El valor objetivo debe ser un número" });
    }

    if (!deadline || !(new Date(deadline) instanceof Date)) {
      return res.status(400).json({ message: "La fecha límite es inválida" });
    }

    const newGoal = new Goal({
      user: req.user.id,
      type,
      targetValue,
      deadline,
      currentValue: 0, // Valor inicial por defecto
    });

    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar el progreso de una meta
exports.updateGoalProgress = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: "Meta no encontrada" });
    }

    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const { currentValue } = req.body;
    if (typeof currentValue !== "number") {
      return res.status(400).json({ message: "El valor actual debe ser un número" });
    }

    goal.currentValue = currentValue;

    // Verificar si la meta se ha alcanzado o fallado
    if (goal.currentValue >= goal.targetValue) {
      goal.status = "achieved";
    } else if (new Date() > new Date(goal.deadline)) {
      goal.status = "failed";
    }

    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una meta
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: "Meta no encontrada" });
    }

    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: "Meta eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};