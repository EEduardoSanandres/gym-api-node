const Progress = require("../models/Progress");

// Obtener todo el progreso de un usuario
exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id })
      .populate("user")
      .populate("exercise");
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo registro de progreso
exports.createProgress = async (req, res) => {
  try {
    const { exercise, sets, reps, weight, unit } = req.body;

    if (!exercise || !sets || !reps || !weight || !unit) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    if (!['kg', 'lbs'].includes(unit)) {
      return res.status(400).json({ message: "Unidad inválida. Debe ser 'kg' o 'lbs'" });
    }

    const newProgress = new Progress({
      user: req.user.id,
      exercise,
      sets,
      reps,
      weight,
      unit,
    });

    await newProgress.save();
    res.status(201).json(newProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un registro de progreso
exports.updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: "Registro de progreso no encontrado" });
    }

    if (progress.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const { sets, reps, weight, unit } = req.body;

    progress.sets = sets || progress.sets;
    progress.reps = reps || progress.reps;
    progress.weight = weight || progress.weight;
    progress.unit = unit || progress.unit;

    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un registro de progreso
exports.deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: "Registro de progreso no encontrado" });
    }

    if (progress.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    await Progress.findByIdAndDelete(req.params.id);
    res.json({ message: "Registro de progreso eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};