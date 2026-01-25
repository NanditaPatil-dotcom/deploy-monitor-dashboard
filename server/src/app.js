import express from "express";
import healthRouter from "./routes/health.route.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// built-in middleware
app.use(express.json());

// routes
app.use("/health", healthRouter);

// 404 handler (important)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// central error handler (MUST be last)
app.use(errorHandler);

export default app;
