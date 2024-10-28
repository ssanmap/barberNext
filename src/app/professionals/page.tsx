"use client";
import Link from "next/link"
import { useState, useEffect } from "react";
import { Professional } from "../../interfaces/Professional";

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newSpecialty, setNewSpecialty] = useState<string>("");
  const [editingId, setEditingId] = useState<string>("");

  // Función para obtener la lista de profesionales
  const fetchProfessionals = async () => {
    const response = await fetch("/api/professionals/list");
    const data = await response.json();
    setProfessionals(data);
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  // Crear o actualizar profesional
  const handleCreateOrUpdate = async () => {
    const professionalData = { name: newName, specialty: newSpecialty };

    if (editingId) {
      await fetch(`/api/professionals/update/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(professionalData),
      });
    } else {
      await fetch("/api/professionals/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(professionalData),
      });
    }

    setNewName("");
    setNewSpecialty("");
    setEditingId("");
    await fetchProfessionals(); // Refresca la lista después de guardar cambios
  };

  // Editar profesional
  const handleEdit = (professional: Professional) => {
    setNewName(professional.name);
    setNewSpecialty(professional.specialty);
    setEditingId(professional._id);
  };

  // Eliminar profesional
  const handleDelete = async (id: string) => {
    await fetch(`/api/professionals/delete/${id}`, { method: "DELETE" });
    await fetchProfessionals(); // Refresca la lista después de eliminar
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Gestión de Profesionales</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">{editingId ? "Editar Profesional" : "Crear Profesional"}</h2>
        <input
          className="border p-2 rounded mb-4 w-full"
          placeholder="Nombre"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          className="border p-2 rounded mb-4 w-full"
          placeholder="Especialidad"
          value={newSpecialty}
          onChange={(e) => setNewSpecialty(e.target.value)}
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
        <h2 className="text-2xl font-semibold mb-4">Profesionales</h2>
        {professionals.map((professional) => (
          <div key={professional._id} className="flex items-center justify-between mb-4">
            <div>
              <p className="text-lg font-medium">{professional.name}</p>
              <p className="text-sm text-gray-500">{professional.specialty}</p>
            </div>
            <div>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => handleEdit(professional)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(professional._id)}
              >
                Eliminar
              </button>
              <Link href={`/professionals/${professional._id}/schedules`}>
          <button className="bg-green-500 text-white px-3 py-1 rounded">
            Ver Horarios
          </button>
        </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
