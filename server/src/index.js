import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db.js";
import statusRoutes from "./routes/statusRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(statusRoutes);
app.use("/api/tasks", taskRoutes);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:${3000}`);
  });
});
