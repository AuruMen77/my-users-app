export default function UserCard({ user }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">{user.name}</h2>
      <p className="text-sm text-gray-500 mb-1">{user.company.name}</p>
      <p className="text-sm text-gray-600">{user.email}</p>
    </div>
  );
}
