import { Router } from "express";
import adminRoutes from "./admin.route";
import applicationRoutes from "./application.routes"; 

const router = Router();

router.use("/admin", adminRoutes);
router.use("/applications", applicationRoutes); 

export default router;
