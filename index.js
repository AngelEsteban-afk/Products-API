import express from "express";
import morgan from "morgan";
import cors from "cors";
import salesRoutes from "./src/routes/sales.routes.js";
import clientRoutes from "./src/routes/client.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("common"));

app.use("/api", salesRoutes);
app.use("/api", clientRoutes);

app.listen(PORT);

console.log(`Server running on port ${PORT}`);
