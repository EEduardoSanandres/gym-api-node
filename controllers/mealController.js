const Meal = require("../models/Meal");

// Obtener todas las comidas de un usuario
exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user.id }).populate("user");
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva comida
exports.createMeal = async (req, res) => {
  try {
    const { meals } = req.body;

    if (!meals || !Array.isArray(meals)) {
      return res.status(400).json({ message: "Datos de comidas inválidos" });
    }

    // Calcular el total de calorías
    const totalCalories = meals.reduce((total, meal) => total + (meal.calories || 0), 0);

    const newMeal = new Meal({
      user: req.user.id,
      meals,
      totalCalories,
    });

    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una comida
exports.updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Comida no encontrada" });
    }

    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const { meals } = req.body;
    if (!meals || !Array.isArray(meals)) {
      return res.status(400).json({ message: "Datos de comidas inválidos" });
    }

    // Recalcular el total de calorías
    const totalCalories = meals.reduce((total, meal) => total + (meal.calories || 0), 0);

    meal.meals = meals;
    meal.totalCalories = totalCalories;

    await meal.save();
    res.json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una comida
exports.deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Comida no encontrada" });
    }

    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: "Comida eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};