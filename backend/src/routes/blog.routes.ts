import express from "express";
import * as BlogController from "../controllers/blog.controller";
import { authenticateUser, requireRole } from "../middleware/auth.middleware";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

router.get(
  "/",
  BlogController.getAllPosts
);


router.get(
  "/slug/:slug",
  BlogController.getPostBySlug
);

router.get(
    "/check-slug",
    authenticateUser,
    requireRole(["admin", "super_admin"]),
    BlogController.checkSlugAvailability
  );


/**
 * (Admin only)
 */

router.post(
  "/",
  authenticateUser,
  requireRole(["admin", "super_admin"]),
  BlogController.createPost
);

router.post(
  "/upload-image",
  authenticateUser,
  requireRole(["admin", "super_admin"]),
  upload.single("image"), 
  BlogController.uploadPostImage
);


router.get(
  "/:id",
  authenticateUser,
  requireRole(["admin", "super_admin"]),
  BlogController.getPostById
);


router.patch(
  "/:id",
  authenticateUser,
  requireRole(["admin", "super_admin"]),
  BlogController.updatePost
);


router.patch(
  "/:id/publish",
  authenticateUser,
  requireRole(["admin", "super_admin"]),
  BlogController.publishPost
);


router.patch(
  "/:id/unpublish",
  authenticateUser,
  requireRole(["admin", "super_admin"]),
  BlogController.unpublishPost
);


router.delete(
  "/:id",
  authenticateUser,
  requireRole(["admin", "super_admin"]),
  BlogController.deletePost
);


router.delete(
  "/:id/permanent",
  authenticateUser,
  requireRole(["super_admin"]),
  BlogController.permanentlyDeletePost
);


router.get(
  "/admin/stats",
  authenticateUser,
  requireRole(["admin", "super_admin"]),
  BlogController.getBlogStats
);

export default router;