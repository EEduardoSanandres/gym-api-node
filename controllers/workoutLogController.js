const WorkoutLog = require("../models/WorkoutLog");

// Obtener todos los registros de entrenamiento de un usuario
exports.getWorkoutLogs = async (req, res) => {
  try {
    const logs = await WorkoutLog.find({ user: req.user.id })
      .populate("user")
      .populate("exercises.exercise");
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo registro de entrenamiento
exports.createWorkoutLog = async (req, res) => {
  try {
    const { exercises, duration } = req.body;

    if (!Array.isArray(exercises)) {
      return res.status(400).json({ message: "Datos de ejercicios inválidos" });
    }

    const newWorkoutLog = new WorkoutLog({
      user: req.user.id,
      exercises,
      duration,
    });

    await newWorkoutLog.save();
    res.status(201).json(newWorkoutLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un registro de entrenamiento
exports.updateWorkoutLog = async (req, res) => {
  try {
    const log = await WorkoutLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ message: "Registro de entrenamiento no encontrado" });
    }

    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const { exercises, duration } = req.body;

    log.exercises = exercises || log.exercises;
    log.duration = duration || log.duration;

    await log.save();
    res.json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un registro de entrenamiento
exports.deleteWorkoutLog = async (req, res) => {
  try {
    const log = await WorkoutLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ message: "Registro de entrenamiento no encontrado" });
    }

    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    await WorkoutLog.findByIdAndDelete(req.params.id);
    res.json({ message: "Registro de entrenamiento eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};