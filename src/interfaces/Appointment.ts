// src/interfaces/Service.ts
export interface Service {
    _id: string;
    name: string;
    duration: number;
    price: number;
  }
  
  // src/interfaces/Professional.ts
  export interface Professional {
    _id: string;
    name: string;
    specialty: string;
  }
  
  // src/interfaces/Appointment.ts
  export interface Appointment {
    _id: string;
    clientId: string;
    serviceId: string;
    professionalId: string;
    date: string;
    status: string;
  }
  