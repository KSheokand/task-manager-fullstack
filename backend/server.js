const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

dotenv.config();
connectDB();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/teams", require("./routes/teamRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

/* ---------- SWAGGER ---------- */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("Task Management API Running");
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
