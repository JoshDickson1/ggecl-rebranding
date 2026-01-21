import express from "express"
import cors from "cors"
import healthRoute from "./routes/health.routes"
import adminRoutes from "./routes/admin.route"
import blogRoutes from "./routes/blog.route"

const app = express()
app.use("/api", healthRoute)
app.use(cors())
app.use(express.json())
app.use("/api/admin", adminRoutes)
app.use("/api/blog", blogRoutes)


export default app
