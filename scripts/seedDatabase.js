const mongoose = require("mongoose");
const Exercise = require("../models/Exercise");
const User = require("../models/User");
const WorkoutPlan = require("../models/WorkoutPlan");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

dotenv.config();

const exercisesFilePath = path.join(__dirname, "../data/exercises.json");
const initialExercises = JSON.parse(fs.readFileSync(exercisesFilePath, "utf-8"));

const initialUser = {
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123",
};

const initialWorkoutPlan = {
  name: "Beginner Full Body Plan",
  weeks: [
    {
      days: [
        {
          exercises: []
        },
      ],
    },
  ],
};

const seedDatabase = async () => {
  try {

    const exerciseCount = await Exercise.countDocuments();
    if (exerciseCount === 0) {
      await Exercise.insertMany(initialExercises);
      console.log("✅ Exercises seeded successfully");
    }

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

    const workoutPlanCount = await WorkoutPlan.countDocuments();
    if (workoutPlanCount === 0) {
      const someExercises = await Exercise.find().limit(5);
      initialWorkoutPlan.weeks[0].days[0].exercises = someExercises.map(exercise => ({
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

    console.log("🌱 Database seeding completed.");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
