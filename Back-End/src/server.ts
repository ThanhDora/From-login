import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
