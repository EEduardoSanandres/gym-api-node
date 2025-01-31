const Exercise = require("../models/Exercise");

// Get all exercises
exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new exercise
exports.createExercise = async (req, res) => {
  try {
    const { name, muscleGroup, equipment, steps, difficulty, videoUrl, imageUrl, gifUrl } = req.body;

    // Ensure steps is a non-empty array
    if (!Array.isArray(steps) || steps.length === 0) {
      return res.status(400).json({ message: "Steps must be a non-empty array." });
    }

    // Validate difficulty level
    const validDifficulties = ["Beginner", "Intermediate", "Advanced"];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: "Invalid difficulty level. Choose Beginner, Intermediate, or Advanced." });
    }

    const newExercise = new Exercise({
      name,
      muscleGroup,
      equipment,
      steps,
      difficulty,
      videoUrl: videoUrl || null, 
      imageUrl: imageUrl || null, 
      gifUrl: gifUrl || null, 
    });

    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single exercise by ID
exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an exercise
exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });
    res.json({ message: "Exercise successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing exercise
exports.updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get exercises by muscle group
exports.getExercisesByMuscleGroup = async (req, res) => {
  try {
    const exercises = await Exercise.find({ muscleGroup: req.params.muscleGroup });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get exercises by difficulty level
exports.getExercisesByDifficulty = async (req, res) => {
  try {
    const exercises = await Exercise.find({ difficulty: req.params.difficulty });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
