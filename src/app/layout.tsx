import "./globals.css";

export const metadata = {
  title: "Barbería App",
  description: "App para reservas en barbería y peluquería",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-gray-100 text-gray-900">
        <header className="p-4 bg-black text-white">
          <h1>Barbería App</h1>
        </header>
        <main className="p-8">{children}</main>
        <footer className="p-4 bg-gray-800 text-white text-center">
          &copy; {new Date().getFullYear()} Barbería App
        </footer>
      </body>
    </html>
  );
}
