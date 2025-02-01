const Measurement = require("../models/Measurement");

// Obtener todas las mediciones de un usuario
exports.getMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.find({ user: req.user.id }).populate("user");
    res.json(measurements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva medición
exports.createMeasurement = async (req, res) => {
  try {
    const { weight, bodyFat, waist, chest, arms, thighs } = req.body;

    const newMeasurement = new Measurement({
      user: req.user.id,
      weight,
      bodyFat,
      waist,
      chest,
      arms,
      thighs,
    });

    await newMeasurement.save();
    res.status(201).json(newMeasurement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una medición
exports.updateMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findById(req.params.id);
    if (!measurement) {
      return res.status(404).json({ message: "Medición no encontrada" });
    }

    if (measurement.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const { weight, bodyFat, waist, chest, arms, thighs } = req.body;

    measurement.weight = weight || measurement.weight;
    measurement.bodyFat = bodyFat || measurement.bodyFat;
    measurement.waist = waist || measurement.waist;
    measurement.chest = chest || measurement.chest;
    measurement.arms = arms || measurement.arms;
    measurement.thighs = thighs || measurement.thighs;

    await measurement.save();
    res.json(measurement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una medición
exports.deleteMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findById(req.params.id);
    if (!measurement) {
      return res.status(404).json({ message: "Medición no encontrada" });
    }

    if (measurement.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    await Measurement.findByIdAndDelete(req.params.id);
    res.json({ message: "Medición eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};