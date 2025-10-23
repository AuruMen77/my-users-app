import './globals.css';
import Link from "next/link";

export const metadata = {
  title: 'My Users App',
  description: 'A simple elegant Next.js + Tailwind user management app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 antialiased">
        {/* Navbar */}
        <nav className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-blue-700 tracking-tight">My Users App</h1>
            <div className="flex gap-4 text-gray-600">
            <Link
                href="/"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/users"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Users
              </Link>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}