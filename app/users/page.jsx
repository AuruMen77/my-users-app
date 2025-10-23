'use client';

import { useState, useEffect } from 'react';
import UserCard from '@/components/UserCard';
import CreateUserModal from '@/components/CreateUserModal';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
  
    async function fetchUsers() {
      try {
        if (isMounted) setLoading(true);
        const res = await fetch('/api/users', { cache: 'no-store' });
        const data = await res.json();
        if (isMounted) setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
  
    fetchUsers();
  
    return () => { isMounted = false; };
  }, []);
  

  function handleCreate(user) {
    setUsers(prev => [...prev, user]);
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {users.map(u => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>
      )}

      {showModal && (
        <CreateUserModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
      )}
    </div>
  );
}
