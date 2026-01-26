import express from "express";

import healthRouter from "./routes/health.route.js";
import authRouter from "./routes/auth.route.js";
import projectRouter from "./routes/project.route.js";
import serviceRouter from "./routes/service.route.js";

import { errorHandler } from "./middleware/error.middleware.js";



const app = express();

app.use(express.json());

// routes
app.use("/", serviceRouter);
app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/projects", projectRouter);


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// error handler LAST
app.use(errorHandler);

export default app;

