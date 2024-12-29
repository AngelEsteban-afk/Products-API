import { prisma } from "../../db.js";

// Obtener todos los clientes
export const getClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Obtener un unico cliente por ID
export const getClient = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar cliente por ID
    const client = await prisma.client.findUnique({
      where: { id },
    });

    res.status(200).json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

// Crear un nuevo cliente
export const createClient = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validación básica de campos
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const newClient = await prisma.client.create({
      data: { name, email },
    });

    res.status(201).json(newClient);
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ error: "Error creating client" });
  }
};

// Actualizar un cliente existente
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, deleted } = req.body;

    // Verificar si el cliente existe
    const existingClient = await prisma.client.findUnique({
      where: { id: id },
    });

    if (!existingClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Actualizar el cliente
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (deleted !== undefined) updateData.deleted = deleted;

    const updatedClient = await prisma.client.update({
      where: { id: id },
      data: updateData,
    });

    res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(400).json({ error: "Error PUT method", message: error.message });
  }
};

// Eliminar (marcar como eliminado) un cliente
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el cliente existe
    const existingClient = await prisma.client.findUnique({
      where: { id: id },
    });

    if (!existingClient) {
      return res.status(404).json({ error: "Sale not found" });
    }

    // Marcar la venta como eliminada
    const deletedClient = await prisma.client.update({
      where: { id: id },
      data: { deleted: true },
    });

    res.status(200).json(deletedClient);
  } catch (error) {
    console.error("Error deleting client:", error);
    res
      .status(400)
      .json({ error: "Error DELETE method", message: error.message });
  }
};

//Delete para eliminar un cliente de la DB a traves del ID
export const deleteClientDB = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el ID sea un string válido para ObjectId
    if (!id) {
      return res.status(400).json({ error: "ID parameter is required." });
    }

    const client = await prisma.client.delete({
      where: { id: id }, // El ID debe ser un string válido compatible con ObjectId
    });

    res.status(200).json({ message: "Client deleted successfully", client });
  } catch (error) {
    console.error("Error deleting client:", error);

    if (error.code === "P2025") {
      res.status(404).json({ error: "Client not found" });
    } else {
      res
        .status(500)
        .json({ error: "Internal server error", message: error.message });
    }
  }
};

//Agregar al create la propiedad password y a la propiedad password agregarle una libreria, https://www.npmjs.com/package/bcrypt.
//Investigar de que es y como funciona los middlewere.
