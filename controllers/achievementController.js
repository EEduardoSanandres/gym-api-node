const Achievement = require("../models/Achievement");

// Obtener todos los logros de un usuario
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ user: req.user.id }).populate("user");
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo logro
exports.createAchievement = async (req, res) => {
  try {
    const { type } = req.body;
    if (!type || !['streak', 'weightLoss', 'firstWorkout', 'personalRecord'].includes(type)) {
      return res.status(400).json({ message: "Tipo de logro inválido" });
    }

    const newAchievement = new Achievement({
      user: req.user.id,
      type,
    });

    await newAchievement.save();
    res.status(201).json(newAchievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un logro
exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: "Logro no encontrado" });
    }

    if (achievement.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: "Logro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};