import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { Project } from "../models/project.model.js";

const router = Router();

/**
 * POST /projects
 * Create a new project
 */
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await Project.create({
      name,
      owner: req.user._id,
      members: [req.user._id], // owner is also a member
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /projects
 * List projects for logged-in user
 */
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const projects = await Project.find({
      members: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    next(err);
  }
});

export default router;
