import express from "express";
import healthRouter from "./routes/health.route.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.route.js";
import meRouter from "./routes/me.route.js";
import projectRouter from "./routes/project.route.js";



const app = express();

// built-in middleware
app.use(express.json());

// routes
app.use("/health", healthRouter);

app.use("/auth", authRouter);

app.use("/projects", projectRouter);


app.use("/", meRouter);

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
