import cors from "cors"
import express from "express"
import { errorHandler, notFoundHandler } from "./middleware/errorHandler"
import routes from "./routes"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes)


app.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: Date.now(),
    });
  });

app.use(notFoundHandler);

app.use(errorHandler);


export default app
