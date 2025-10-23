import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import CreateUserModal from '../components/CreateUserModal';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }

  function handleCreate(newUser) {
    // append to UI
    setUsers(prev => [...prev, newUser]);
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Users</h1>
        <button onClick={() => setShowModal(true)}>Create User</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 12 }}>
          {users.map(u => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>
      )}

      {showModal && (
        <CreateUserModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
