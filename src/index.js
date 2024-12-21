import express from `express`;
import morgan from "morgan";
import cors from "cors";
import salesRoutes from "./routes/sales.routes"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("common"));

app.use("/api", salesRoutes);

app.listen(PORT);

console.log(`Server running on port ${PORT}`);	
