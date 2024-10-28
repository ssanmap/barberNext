"use client";

import { useState, useEffect } from "react";
import { Appointment, Professional, Service } from "../../interfaces/Appointment";
import { DateTime } from 'luxon';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [clientId, setClientId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [professionalId, setProfessionalId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [editingId, setEditingId] = useState("");

  const fetchAppointments = async () => {
    const response = await fetch("/api/appointments/list");
    const data = await response.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();

    const fetchServices = async () => {
      const response = await fetch("/api/services/list");
      const data = await response.json();
      setServices(data);
    };

    const fetchProfessionals = async () => {
      const response = await fetch("/api/professionals/list");
      const data = await response.json();
      setProfessionals(data);
    };

    fetchServices();
    fetchProfessionals();
  }, []);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (date && professionalId) {
        const response = await fetch(`/api/appointments/available?professionalId=${professionalId}&date=${date}`);
        const data = await response.json();
        console.log("Available Times:", data); // Log para verificar
        setAvailableTimes(data); // Asegúrate de que esto se esté estableciendo correctamente
      }
    };

    fetchAvailableTimes();
  }, [date, professionalId]);

  const handleCreateOrUpdate = async () => {
    const service = services.find(s => s._id === serviceId);
    const duration = service ? service.duration : 0;
       // Combina la fecha y la hora
       const dateTimeString = `${date}T${time}`;
    
       // Log para verificar el valor antes de convertir
       console.log("dateTimeString:", dateTimeString);
       
       // Verifica si la fecha y la hora son válidas
       if (!date || !time) {
           console.error("La fecha o la hora son inválidas");
           return;
       }
   
    const dateToSave = DateTime.fromISO(dateTimeString, { zone: 'local' }).toJSDate();
  
    // Asegúrate de que dateToSave sea válido
    if (isNaN(dateToSave.getTime())) {
      console.error("La fecha generada es inválida:", dateToSave);
      return; // No continúes si la fecha es inválida
    }
    const appointmentData: Partial<Appointment> = { clientId, serviceId, professionalId,     date: dateTimeString,  status: "pending", duration };

    const endpoint = editingId ? `/api/appointments/update/${editingId}` : "/api/appointments/create";
    const method = editingId ? "PUT" : "POST";

    await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData),
    });

    await fetchAppointments(); // Refresh list
    setClientId("");
    setServiceId("");
    setProfessionalId("");
    setDate("");
    setTime("");
    setEditingId("");
  };

  const handleEdit = (appointment: Appointment) => {
    setClientId(appointment.clientId);
    setServiceId(appointment.serviceId);
    setProfessionalId(appointment.professionalId);
    setDate(new Date(appointment.date).toISOString().split("T")[0]);
    setTime(new Date(appointment.date).toISOString().split("T")[1].slice(0, 5));
    setEditingId(appointment._id);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/appointments/delete/${id}`, { method: "DELETE" });
    await fetchAppointments(); // Refresh list
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Gestión de Citas</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">{editingId ? "Editar Cita" : "Crear Cita"}</h2>
        <input
          className="border p-2 rounded mb-4 w-full"
          placeholder="Nombre del Cliente"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
        <select
          className="border p-2 rounded mb-4 w-full"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value="">Selecciona un Servicio</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name} - {service.duration} mins - ${service.price}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded mb-4 w-full"
          value={professionalId}
          onChange={(e) => setProfessionalId(e.target.value)}
        >
          <option value="">Selecciona un Profesional</option>
          {professionals.map((professional) => (
            <option key={professional._id} value={professional._id}>
              {professional.name} - {professional.specialty}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="border p-2 rounded mb-4 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          className="border p-2 rounded mb-4 w-full"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">Selecciona un horario</option>
          {availableTimes.map((availableTime) => (
            <option key={availableTime} value={availableTime}>
              {availableTime}
            </option>
          ))}
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleCreateOrUpdate}>
          {editingId ? "Guardar Cambios" : "Crear"}
        </button>
        {editingId && (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setEditingId("")}
          >
            Cancelar
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Citas</h2>
        {appointments.map((appointment) => {
          const service = services.find(s => s._id === appointment.serviceId)?.name || "Servicio desconocido";
          const professional = professionals.find(p => p._id === appointment.professionalId)?.name || "Profesional desconocido";

          return (
            <div key={appointment._id} className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-medium">{appointment.clientId}</p>
                <p className="text-sm text-gray-500">
                  Servicio: {service}, Profesional: {professional}, Fecha:{" "}
                  {new Date(appointment.date).toLocaleString()}
                </p>
              </div>
              <div>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleEdit(appointment)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(appointment._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
