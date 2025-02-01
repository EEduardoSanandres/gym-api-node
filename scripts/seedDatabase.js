const mongoose = require("mongoose");
const Exercise = require("../models/Exercise");
const User = require("../models/User");
const WorkoutPlan = require("../models/WorkoutPlan");
const Goal = require("../models/Goal");
const Achievement = require("../models/Achievement");
const Meal = require("../models/Meal");
const Measurement = require("../models/Measurement");
const Progress = require("../models/Progress");
const Routine = require("../models/Routine");
const WorkoutLog = require("../models/WorkoutLog");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

dotenv.config();

// Rutas de archivos JSON con datos iniciales
const exercisesFilePath = path.join(__dirname, "../data/exercises.json");
const initialExercises = JSON.parse(fs.readFileSync(exercisesFilePath, "utf-8"));

// Datos iniciales para el usuario administrador
const initialUser = {
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123",
};

// Datos iniciales para el plan de entrenamiento
const initialWorkoutPlan = {
  name: "Beginner Full Body Plan",
  weeks: [
    {
      days: [
        {
          exercises: [],
        },
      ],
    },
  ],
};

// Datos iniciales para metas, logros, comidas, mediciones, progreso, rutinas y registros de entrenamiento
const initialGoal = {
  type: "weightLoss",
  targetValue: 70,
  deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días desde hoy
};

const initialAchievement = {
  type: "firstWorkout",
};

const initialMeal = {
  meals: [
    {
      name: "Chicken Salad",
      calories: 300,
      protein: 25,
      carbs: 10,
      fats: 15,
    },
  ],
};

const initialMeasurement = {
  weight: 75,
  bodyFat: 15,
  waist: 85,
  chest: 95,
  arms: 32,
  thighs: 55,
};

const initialProgress = {
  sets: 3,
  reps: 12,
  weight: 50,
  unit: "kg",
};

const initialRoutine = {
  name: "Full Body Strength",
  difficulty: "Intermediate",
  durationWeeks: 8,
  focus: "strength",
  exercises: [],
};

const initialWorkoutLog = {
  exercises: [
    {
      setsCompleted: 3,
      repsPerSet: [12, 12, 12],
      weightsUsed: [50, 50, 50],
      notes: "Focused on form",
    },
  ],
  duration: 60,
};

// Función para poblar la base de datos
const seedDatabase = async () => {
  try {
    // Verificar y poblar ejercicios
    const exerciseCount = await Exercise.countDocuments();
    if (exerciseCount === 0) {
      await Exercise.insertMany(initialExercises);
      console.log("✅ Exercises seeded successfully");
    }

    // Crear usuario administrador si no existe
    let adminUser = await User.findOne({ email: initialUser.email });
    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(initialUser.password, salt);
      adminUser = new User({
        name: initialUser.name,
        email: initialUser.email,
        password: hashedPassword,
      });
      await adminUser.save();
      console.log("✅ Admin user created successfully!");
    }

    // Crear plan de entrenamiento predeterminado si no existe
    const workoutPlanCount = await WorkoutPlan.countDocuments();
    if (workoutPlanCount === 0) {
      const someExercises = await Exercise.find().limit(5);
      initialWorkoutPlan.weeks[0].days[0].exercises = someExercises.map((exercise) => ({
        exercise: exercise._id,
        sets: 3,
        reps: 12,
        weight: 50,
        unit: "kg",
      }));
      const newWorkoutPlan = new WorkoutPlan({
        user: adminUser._id,
        name: initialWorkoutPlan.name,
        weeks: initialWorkoutPlan.weeks,
      });
      await newWorkoutPlan.save();
      console.log("✅ Default workout plan created successfully!");
    }

    // Crear meta inicial para el usuario administrador
    const goalCount = await Goal.countDocuments();
    if (goalCount === 0) {
      const newGoal = new Goal({
        user: adminUser._id,
        ...initialGoal,
      });
      await newGoal.save();
      console.log("✅ Initial goal created successfully!");
    }

    // Crear logro inicial para el usuario administrador
    const achievementCount = await Achievement.countDocuments();
    if (achievementCount === 0) {
      const newAchievement = new Achievement({
        user: adminUser._id,
        ...initialAchievement,
      });
      await newAchievement.save();
      console.log("✅ Initial achievement created successfully!");
    }

    // Crear comida inicial para el usuario administrador
    const mealCount = await Meal.countDocuments();
    if (mealCount === 0) {
      const newMeal = new Meal({
        user: adminUser._id,
        ...initialMeal,
      });
      await newMeal.save();
      console.log("✅ Initial meal entry created successfully!");
    }

    // Crear medición corporal inicial para el usuario administrador
    const measurementCount = await Measurement.countDocuments();
    if (measurementCount === 0) {
      const newMeasurement = new Measurement({
        user: adminUser._id,
        ...initialMeasurement,
      });
      await newMeasurement.save();
      console.log("✅ Initial measurement entry created successfully!");
    }

    // Crear progreso inicial para el usuario administrador
    const progressCount = await Progress.countDocuments();
    if (progressCount === 0) {
      const someExercises = await Exercise.find().limit(1);
      const newProgress = new Progress({
        user: adminUser._id,
        exercise: someExercises[0]._id,
        ...initialProgress,
      });
      await newProgress.save();
      console.log("✅ Initial progress entry created successfully!");
    }

    // Crear rutina inicial
    const routineCount = await Routine.countDocuments();
    if (routineCount === 0) {
      const someExercises = await Exercise.find().limit(5);
      initialRoutine.exercises = someExercises.map((exercise) => ({
        exercise: exercise._id,
        sets: 3,
        reps: 12,
      }));
      const newRoutine = new Routine(initialRoutine);
      await newRoutine.save();
      console.log("✅ Initial routine created successfully!");
    }

    // Crear registro de entrenamiento inicial para el usuario administrador
    const workoutLogCount = await WorkoutLog.countDocuments();
    if (workoutLogCount === 0) {
      const someExercises = await Exercise.find().limit(1);
      initialWorkoutLog.exercises[0].exercise = someExercises[0]._id;
      const newWorkoutLog = new WorkoutLog({
        user: adminUser._id,
        ...initialWorkoutLog,
      });
      await newWorkoutLog.save();
      console.log("✅ Initial workout log created successfully!");
    }

    console.log("🌱 Database seeding completed.");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

// Ejecutar el script directamente si es el archivo principal
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;