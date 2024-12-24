import { prisma } from "../../db.js";

// Obtener todas las ventas
export const getSales = async (req, res) => {
  try {
    const sales = await prisma.sales.findMany(); // Obtener todas las ventas
    res.status(200).json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Crear una nueva venta
export const createSales = async (req, res) => {
  try {
    const { stock, unitPrice, ...rest } = req.body;

    const total = stock * unitPrice; // Calcular el total

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
    console.error("Error creating sale:", e);
    res.status(400).json({ error: "Error POST method", message: e.message });
  }
};

// Actualizar una venta existente
export const updateSales = async (req, res) => {
  try {
    const { id } = req.params; // El id es un String
    const updateData = req.body;

    // Verificar si la venta existe
    const existingSale = await prisma.sales.findUnique({
      where: { id: id }, // No necesitas convertir el id a un número, ya que es String
    });

    if (!existingSale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    // Actualizar la venta
    const updatedSale = await prisma.sales.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(updatedSale);
  } catch (error) {
    console.error("Error updating sale:", error);
    res.status(400).json({ error: "Error PUT method", message: error.message });
  }
};

// Eliminar (marcar como eliminada) una venta
export const deleteSales = async (req, res) => {
  try {
    const { id } = req.params; // El id es un String

    // Verificar si la venta existe
    const existingSale = await prisma.sales.findUnique({
      where: { id: id }, // No es necesario convertir el id a un número
    });

    if (!existingSale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    // Marcar la venta como eliminada
    const deletedSale = await prisma.sales.update({
      where: { id: id },
      data: { deleted: true },
    });

    res.status(200).json(deletedSale);
  } catch (error) {
    console.error("Error deleting sale:", error);
    res
      .status(400)
      .json({ error: "Error DELETE method", message: error.message });
  }
};
