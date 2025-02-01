# 🏋️ Gym API - Node.js REST API

![Node.js](https://img.shields.io/badge/Node.js-16.x-green?style=flat&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-black?style=flat&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-brightgreen?style=flat&logo=mongodb)
![Swagger](https://img.shields.io/badge/Swagger-3.x-blue?style=flat&logo=swagger)

Gym API is a RESTful API built with **Node.js, Express, and MongoDB** to manage **gym exercises and workout plans**. It includes **user authentication (JWT), CRUD operations for exercises, and workout plans**.

---

## 📖 Features
✅ **User authentication (JWT-based)**  
✅ **CRUD operations for exercises**  
✅ **Workout plans with sets, reps, and weight tracking**  
✅ **Supports weight units (kg/lb)**  
✅ **Swagger documentation**  
✅ **MongoDB integration**  
✅ **Preloaded exercise database (auto-seeding on first run)**  
---

## 🚀 Installation

### 1️⃣ **Clone the repository**
```bash
git clone https://github.com/EEduardoSanandres/gym-api-node.git
cd gym-api-node
```

### 2️⃣ **Install dependencies**
```bash
npm install
```

### 3️⃣ **Set up environment variables**
Create a **`.env`** file in the project root:
```ini
MONGODB_URI=mongodb://localhost:27017/gymdb
JWT_SECRET=supersecretkey123
PORT=5000
```

### 4️⃣ **Seed the database (Exercises Data)**
The API includes a predefined set of exercises stored in data/exercises.json.
These exercises will be automatically inserted into the database when the server starts if the collection is empty.
If you need to manually seed the database, run:
```bash
node scripts/seedDatabase.js
```
To reset the database and reload the initial exercises, you can use:
```bash
npm run drop:database && node scripts/seedDatabase.js
```

### 5️⃣ **Start the server**
```bash
npm run dev
```
Your API will run at:  
📍 `http://localhost:5000`

---

## 📌 API Documentation (Swagger)
Once the server is running, access the **Swagger UI**:  
📖 [http://localhost:5000/api-docs](http://localhost:5000/api-docs)  

Swagger provides an **interactive API documentation** where you can test endpoints directly.

---

## 🔑 Authentication (JWT)
This API uses **JWT (JSON Web Token)** for authentication.  

1️⃣ **Sign Up**  
   - `POST /api/auth/signup`  
   - Example request:
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```
   - Returns:
   ```json
   {
     "token": "your-jwt-token"
   }
   ```

2️⃣ **Login**  
   - `POST /api/auth/login`
   - Example request:
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```
   - Returns:
   ```json
   {
     "token": "your-jwt-token"
   }
   ```
3️⃣ **Use the Token**  
   - Include the token in **Authorization header** as `Bearer <token>` for protected routes.

---

## 📂 API Endpoints

### 🔹 **Authentication**
| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| `POST` | `/api/auth/signup`    | Register a new user      | ❌ No         |
| `POST` | `/api/auth/login`     | Log in and get a JWT     | ❌ No         |

---

### 🔹 **Exercises**
| Method   | Endpoint             | Description               | Auth Required |
|----------|----------------------|---------------------------|---------------|
| `GET`    | `/api/exercises`     | Get all exercises         | ❌ No         |
| `POST`   | `/api/exercises`     | Create a new exercise     | ✅ Yes        |
| `GET`    | `/api/exercises/:id` | Get exercise by ID        | ❌ No         |
| `DELETE` | `/api/exercises/:id` | Delete an exercise        | ✅ Yes        |

---

### 🔹 **Workout Plans**
| Method   | Endpoint                   | Description                        | Auth Required |
|----------|----------------------------|------------------------------------|---------------|
| `GET`    | `/api/workout-plans`       | Get user's workout plans          | ✅ Yes        |
| `POST`   | `/api/workout-plans`       | Create a new workout plan         | ✅ Yes        |
| `PUT`    | `/api/workout-plans/:id`   | Update a workout plan             | ✅ Yes        |

---

### 🔹 **Goals**
| Method   | Endpoint            | Description                     | Auth Required |
|----------|---------------------|---------------------------------|---------------|
| `GET`    | `/api/goals`        | Get all goals of the user       | ✅ Yes        |
| `POST`   | `/api/goals`        | Create a new goal               | ✅ Yes        |
| `PUT`    | `/api/goals/:id`    | Update a goal                   | ✅ Yes        |
| `DELETE` | `/api/goals/:id`    | Delete a goal                   | ✅ Yes        |

---

### 🔹 **Achievements**
| Method   | Endpoint                  | Description                           | Auth Required |
|----------|---------------------------|---------------------------------------|---------------|
| `GET`    | `/api/achievements`       | Get all achievements of the user      | ✅ Yes        |
| `POST`   | `/api/achievements`       | Create a new achievement              | ✅ Yes        |
| `DELETE` | `/api/achievements/:id`   | Delete an achievement                 | ✅ Yes        |

---

### 🔹 **Meals**
| Method   | Endpoint            | Description                     | Auth Required |
|----------|---------------------|---------------------------------|---------------|
| `GET`    | `/api/meals`        | Get all meals of the user       | ✅ Yes        |
| `POST`   | `/api/meals`        | Create a new meal entry         | ✅ Yes        |
| `PUT`    | `/api/meals/:id`    | Update a meal entry             | ✅ Yes        |
| `DELETE` | `/api/meals/:id`    | Delete a meal entry             | ✅ Yes        |

---

### 🔹 **Measurements**
| Method   | Endpoint                  | Description                           | Auth Required |
|----------|---------------------------|---------------------------------------|---------------|
| `GET`    | `/api/measurements`       | Get all body measurements of the user | ✅ Yes        |
| `POST`   | `/api/measurements`       | Create a new measurement entry        | ✅ Yes        |
| `PUT`    | `/api/measurements/:id`   | Update a measurement entry            | ✅ Yes        |
| `DELETE` | `/api/measurements/:id`   | Delete a measurement entry            | ✅ Yes        |

---

### 🔹 **Progress**
| Method   | Endpoint            | Description                     | Auth Required |
|----------|---------------------|---------------------------------|---------------|
| `GET`    | `/api/progress`     | Get all progress entries        | ✅ Yes        |
| `POST`   | `/api/progress`     | Create a new progress entry     | ✅ Yes        |
| `PUT`    | `/api/progress/:id` | Update a progress entry         | ✅ Yes        |
| `DELETE` | `/api/progress/:id` | Delete a progress entry         | ✅ Yes        |

---

### 🔹 **Routines**
| Method   | Endpoint            | Description                     | Auth Required |
|----------|---------------------|---------------------------------|---------------|
| `GET`    | `/api/routines`     | Get all routines                | ❌ No         |
| `POST`   | `/api/routines`     | Create a new routine            | ✅ Yes        |
| `PUT`    | `/api/routines/:id` | Update a routine                | ✅ Yes        |
| `DELETE` | `/api/routines/:id` | Delete a routine                | ✅ Yes        |

---

### 🔹 **Workout Logs**
| Method   | Endpoint                  | Description                           | Auth Required |
|----------|---------------------------|---------------------------------------|---------------|
| `GET`    | `/api/workout-logs`       | Get all workout logs of the user      | ✅ Yes        |
| `POST`   | `/api/workout-logs`       | Create a new workout log              | ✅ Yes        |
| `PUT`    | `/api/workout-logs/:id`   | Update a workout log                  | ✅ Yes        |
| `DELETE` | `/api/workout-logs/:id`   | Delete a workout log                  | ✅ Yes        |

---

## 🏗️ Project Structure

```
📂 gym-api-node
 ├── 📂 config/         # Configuration files (DB, Swagger)
 ├── 📂 controllers/    # Business logic
 ├── 📂 middleware/     # Authentication middleware
 ├── 📂 models/         # Mongoose schemas
 ├── 📂 routes/         # Express routes
 ├── 📂 data/           # Static exercise data in JSON format
 ├── 📂 scripts/        # Utility scripts
 ├── .env               # Environment variables (ignored)
 ├── .gitignore         # Ignored files
 ├── package.json       # Dependencies
 ├── server.js          # Main entry point
```

---

## 🛠️ Technologies Used
- **Node.js** & **Express.js** - Backend framework
- **MongoDB** & **Mongoose** - Database & ORM
- **JWT (JSON Web Token)** - Authentication
- **Swagger** - API documentation
- **bcryptjs** - Password encryption
- **dotenv** - Environment variables management
- **JSON data files** - Preloaded exercises in `data/exercises.json`
- **Seeding scripts** - Auto-inserts exercises into MongoDB on first run
---

## 🤝 Contributing
Want to improve this project? Feel free to fork the repository and submit a pull request.

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🎯 Next Steps (Future Features)
✅ **Workout history tracking**  
✅ **User profile settings (update name, email, password)**  
✅ **Exercise categories & filtering**  
✅ **Integration with fitness tracking apps**  

---

## 📧 Contact
**Maintainer:** [@EEduardoSanandres](https://github.com/EEduardoSanandres)  
For any questions, feel free to open an **issue** or submit a **pull request**.  

---

🚀 **Now you're ready to build and scale your Gym API!**  
🔗 **Don't forget to star ⭐ the repo if you like it!**