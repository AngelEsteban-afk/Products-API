import { Router } from "express";
import {
  getSales,
  createSale,
  updateSales,
  deleteSales,
} from "../controller/sales.controller.js";

const router = Router();

router.get("/sales", getSales);
router.post("/sales", createSale);
router.put("/sales/:id", updateSales);
router.delete("/sales/:id", deleteSales);

export default router;
