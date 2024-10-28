"use client";

import { useState, useEffect } from "react";
import { use } from "react";

export default function SchedulesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: professionalId } = use(params); // Desenvuelve el objeto params

  const [schedules, setSchedules] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    const fetchSchedules = async () => {
      const response = await fetch(`/api/schedules/list/${professionalId}`);
      const data = await response.json();
      setSchedules(data);
    };

    if (professionalId) fetchSchedules();
  }, [professionalId]);

  const handleCreateOrUpdate = async () => {
    const scheduleData = { professionalId, dayOfWeek: getDayOfWeekNumber(dayOfWeek), startTime, endTime };

    if (editingId) {
      await fetch(`/api/schedules/update/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleData),
      });
    } else {
      await fetch("/api/schedules/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleData),
      });
    }

    // Refrescar la lista de horarios
    const response = await fetch(`/api/schedules/list/${professionalId}`);
    const data = await response.json();
    setSchedules(data);

    // Resetear el formulario
    setDayOfWeek("");
    setStartTime("");
    setEndTime("");
    setEditingId("");
  };

  const handleEdit = (schedule: any) => {
    setDayOfWeek(schedule.dayOfWeek);
    setStartTime(schedule.startTime);
    setEndTime(schedule.endTime);
    setEditingId(schedule._id);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/schedules/delete/${id}`, { method: "DELETE" });
    // Refrescar la lista después de eliminar
    const response = await fetch(`/api/schedules/list/${professionalId}`);
    const data = await response.json();
    setSchedules(data);
  };

  // Función para convertir el día de la semana a número
  const getDayOfWeekNumber = (day: string) => {
    switch (day) {
      case 'Lunes': return 1;
      case 'Martes': return 2;
      case 'Miércoles': return 3;
      case 'Jueves': return 4;
      case 'Viernes': return 5;
      case 'Sábado': return 6;
      case 'Domingo': return 0;
      default: return -1; // Valor no válido
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Gestión de Horarios</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">{editingId ? "Editar Horario" : "Crear Horario"}</h2>
        
        <select
          className="border p-2 rounded mb-4 w-full"
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
        >
          <option value="">Selecciona un Día</option>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
          <option value="Domingo">Domingo</option>
        </select>

        <input
          type="time"
          className="border p-2 rounded mb-4 w-full"
          placeholder="Hora de Inicio"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          className="border p-2 rounded mb-4 w-full"
          placeholder="Hora de Fin"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
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
        <h2 className="text-2xl font-semibold mb-4">Horarios</h2>
        {schedules.map((schedule: any) => (
          <div key={schedule._id} className="flex items-center justify-between mb-4">
            <div>
              <p className="text-lg font-medium">{["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][schedule.dayOfWeek]}</p>
              <p className="text-sm text-gray-500">
                {schedule.startTime} - {schedule.endTime}
              </p>
            </div>
            <div>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => handleEdit(schedule)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(schedule._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
