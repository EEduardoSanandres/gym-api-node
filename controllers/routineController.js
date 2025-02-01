const Routine = require("../models/Routine");

// Obtener todas las rutinas
exports.getRoutines = async (req, res) => {
  try {
    const routines = await Routine.find().populate("exercises.exercise");
    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva rutina
exports.createRoutine = async (req, res) => {
  try {
    const { name, difficulty, durationWeeks, focus, exercises } = req.body;

    if (!name || !difficulty || !durationWeeks || !focus || !Array.isArray(exercises)) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    const newRoutine = new Routine({
      name,
      difficulty,
      durationWeeks,
      focus,
      exercises,
    });

    await newRoutine.save();
    res.status(201).json(newRoutine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una rutina
exports.updateRoutine = async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);
    if (!routine) {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }

    const { name, difficulty, durationWeeks, focus, exercises } = req.body;

    routine.name = name || routine.name;
    routine.difficulty = difficulty || routine.difficulty;
    routine.durationWeeks = durationWeeks || routine.durationWeeks;
    routine.focus = focus || routine.focus;
    routine.exercises = exercises || routine.exercises;

    await routine.save();
    res.json(routine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una rutina
exports.deleteRoutine = async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);
    if (!routine) {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }

    await Routine.findByIdAndDelete(req.params.id);
    res.json({ message: "Rutina eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};