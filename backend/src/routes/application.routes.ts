import express from "express";
import multer from "multer";
import * as ApplicationController from '../controllers/application.controller'
import { authenticateUser, requireRole } from "../middleware/auth.middleware";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

router.post(
  "/", 
  ApplicationController.createApplication
);


router.get(
  "/:id", 
  authenticateUser, 
  ApplicationController.getApplicationById
);

router.post(
  "/upload-temp", 
  upload.single("file"), 
  ApplicationController.uploadTempDocument
);



// Admin routes - require admin role
router.get(
  "/admin",
  authenticateUser,
  requireRole(["admin", "super_admin"]),
  ApplicationController.getAllApplications
);

router.patch(
  "/admin/:id/status",
  authenticateUser,
  requireRole(["admin", "super_admin"]),
  ApplicationController.updateApplicationStatus
);

router.delete(
  "/admin/:id",
  authenticateUser,
  requireRole(["admin", "super_admin"]),
  ApplicationController.deleteApplication
);

router.get(
  "/admin/stats",
  authenticateUser,
  requireRole(["admin", "super_admin"]),
  ApplicationController.getApplicationStats
);

export default router;