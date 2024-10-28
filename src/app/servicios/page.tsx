"use client";

import { useState, useEffect } from "react";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [editingId, setEditingId] = useState("");

  // Función para obtener servicios desde el API
  const fetchServices = async () => {
    const response = await fetch("/api/services/list");
    const data = await response.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices(); // Cargar servicios al montar el componente
  }, []);

  // Crear o actualizar servicio
  const handleCreateOrUpdate = async () => {
    const serviceData = { name: newName, duration: newDuration, price: newPrice };

    if (editingId) {
      await fetch(`/api/services/update/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });
    } else {
      await fetch("/api/services/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });
    }

    setNewName("");
    setNewDuration("");
    setNewPrice("");
    setEditingId("");
    fetchServices(); // Actualizar lista de servicios
  };

  // Editar servicio
  const handleEdit = (service) => {
    setNewName(service.name);
    setNewDuration(service.duration);
    setNewPrice(service.price);
    setEditingId(service._id);
  };

  // Eliminar servicio
  const handleDelete = async (id) => {
    await fetch(`/api/services/delete/${id}`, { method: "DELETE" });
    fetchServices(); // Actualizar lista de servicios después de eliminar
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Gestión de Servicios</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">{editingId ? "Editar Servicio" : "Crear Servicio"}</h2>
        <input
          className="border p-2 rounded mb-4 w-full"
          placeholder="Nombre"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          className="border p-2 rounded mb-4 w-full"
          placeholder="Duración (min)"
          value={newDuration}
          onChange={(e) => setNewDuration(e.target.value)}
        />
        <input
          className="border p-2 rounded mb-4 w-full"
          placeholder="Precio"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleCreateOrUpdate}>
          {editingId ? "Guardar Cambios" : "Crear"}
        </button>
        {editingId && (
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditingId("")}>
            Cancelar
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Servicios</h2>
        {services.map((service) => (
          <div key={service._id} className="flex items-center justify-between mb-4">
            <div>
              <p className="text-lg font-medium">{service.name}</p>
              <p className="text-sm text-gray-500">{service.duration} mins - ${service.price}</p>
            </div>
            <div>
              <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleEdit(service)}>
                Editar
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(service._id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
