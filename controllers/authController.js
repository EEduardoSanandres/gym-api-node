const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendErrorResponse = (res, status, message, error = null) => {
  console.error(`❌ [${status}] ${message}`, error || "");
  return res.status(status).json({ message });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar que los datos sean correctos
    if (!name || !email || !password) {
      return sendErrorResponse(res, 400, "All fields (name, email, password) are required.");
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendErrorResponse(res, 400, "User already exists.");
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generar Token JWT
    if (!process.env.JWT_SECRET) {
      return sendErrorResponse(res, 500, "Server error: JWT_SECRET is missing in .env file.");
    }

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    sendErrorResponse(res, 500, "Internal server error during signup.", error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar que los datos sean correctos
    if (!email || !password) {
      return sendErrorResponse(res, 400, "Email and password are required.");
    }

    // Verificar si el usuario existe en la BD
    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 401, "Invalid email or password.");
    }

    // Comparar la contraseña ingresada con la almacenada en la BD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, 401, "Invalid email or password.");
    }

    // Generar Token JWT
    if (!process.env.JWT_SECRET) {
      return sendErrorResponse(res, 500, "Server error: JWT_SECRET is missing in .env file.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    sendErrorResponse(res, 500, "Internal server error during login.", error);
  }
};
