import { Router } from "express";
import applicationRoutes from "./application.routes"; 
import blogRoutes from "./blog.routes"; 

const router = Router();

router.use("/applications", applicationRoutes); 
router.use("/blogs", blogRoutes); 

export default router;
