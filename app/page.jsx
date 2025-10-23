export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to <span className="text-blue-600">My Users App</span>
      </h1>
      <p className="text-gray-600 max-w-md mb-8">
        A clean and simple user management system built with Next.js and Tailwind CSS.
      </p>
      <a
        href="/users"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        View Users
      </a>
    </div>
  );
}
