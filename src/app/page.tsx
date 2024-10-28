import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Bienvenido a la Barbería</h2>
      <p className="mb-4 text-center">
        Reserva tu cita con los mejores profesionales en cortes de cabello, barbería y manicura.
      </p>
      <div className="flex gap-4">
      <Link href="/reservas" className="bg-blue-500 text-white px-4 py-2 rounded">
    Reservar
  </Link>
  <Link href="/servicios" className="bg-green-500 text-white px-4 py-2 rounded">
    Ver Servicios
  </Link>
  <Link href="/professionals" className="bg-green-500 text-white px-4 py-2 rounded">
    Profesionales
  </Link>
      </div>
    </div>
  );
}
