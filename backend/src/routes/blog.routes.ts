import express from "express";
import * as BlogController from "../controllers/blog.controller";
import { authenticateUser, requireRole } from "../middleware/auth.middleware";

const router = express.Router();


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