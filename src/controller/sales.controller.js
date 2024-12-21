import { prisma } from "../db";

export const getSales = async (req, res) => {
  try {
    const sales = await prisma.sales.findmany();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createSale = async (req, res) => {
  try {
    const { stock, unitPrice, ...rest } = req.body;

    const total = stock * unitPrice;

    const sale = await prisma.sales.create({
      data: {
        ...rest,
        stock,
        unitPrice,
        total,
      },
    });

    res.status(201).json(sale);
  } catch (e) {
    res.status(400).json({ error: "Error POST method", message: e.message });
  }
};

export const updateSale = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    const existingSale = await prisma.sales.findUnique({
      where: { id },
    });

    if (!existingSale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    const updateSale = await prisma.sales.update({
      where: { id },
      data: updateData,
    });
    res.status(200).json(updateSale);
  } catch (e) {
    res.status(400).json({ error: "Error PUT method", message: e.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    const existingSale = await prisma.sales.findUnique({
      where: { id },
    });

    if (!existingSale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    const deletedSale = await prisma.sales.update({
      where: { id },
      data: { deleted: true },
    });

    res.status(200).json(deletedSale);
  } catch (e) {
    res.status(400).json({ error: "Error DELETE method", message: e.message });
  }
};
