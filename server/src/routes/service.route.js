import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { Project } from "../models/project.model.js";
import { Service } from "../models/service.model.js";
import { Metric } from "../models/metric.model.js";
import mongoose from "mongoose";

const router = Router();

const verifyProjectAccess = async (projectId, userId) => {
  const project = await Project.findOne({
    _id: projectId,
    members: userId,
  });

  return project;
};

router.post(
  "/projects/:projectId/services",
  requireAuth,
  async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const { name, type, healthCheckUrl } = req.body;

      if (!name || !type) {
        return res
          .status(400)
          .json({ message: "Service name and type are required" });
      }

      const project = await verifyProjectAccess(projectId, req.user._id);
      if (!project) {
        return res.status(403).json({ message: "Access denied" });
      }

      const service = await Service.create({
        projectId,
        name,
        type,
        healthCheckUrl,
      });

      res.status(201).json(service);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/services/:serviceId",
  requireAuth,
  async (req, res, next) => {
    try {
      const { serviceId } = req.params;

      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      const project = await verifyProjectAccess(
        service.projectId,
        req.user._id
      );
      if (!project) {
        return res.status(403).json({ message: "Access denied" });
      }

      const allowedUpdates = ["name", "type", "healthCheckUrl", "status"];
      allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
          service[field] = req.body[field];
        }
      });

      await service.save();
      res.json(service);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/projects/:projectId/services",
  requireAuth,
  async (req, res, next) => {
    try {
      const { projectId } = req.params;

      const project = await verifyProjectAccess(projectId, req.user._id);
      if (!project) {
        return res.status(403).json({ message: "Access denied" });
      }

      const services = await Service.find({ projectId }).sort({
        createdAt: -1,
      });

      res.json(services);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/services/:serviceId/metrics",
  requireAuth,
  async (req, res, next) => {
    try {
      const { serviceId } = req.params;

      // basic ObjectId validation (important)
      if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }

      const metrics = await Metric.find({ serviceId })
        .sort({ checkedAt: -1 })
        .limit(50);

      res.json(metrics);
    } catch (err) {
      next(err);
    }
  }
);

export default router;