import { Router } from "express";
import applicationRoutes from "./application.routes"; 

const router = Router();

router.use("/applications", applicationRoutes); 

export default router;
