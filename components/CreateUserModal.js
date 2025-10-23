import { useState } from 'react';

export default function CreateUserModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name,
      email,
      username,
      phone,
      website,
      company: { name: companyName }
      // add other fields if you want (address etc.)
    };

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create user');
      }

      const created = await res.json();
      onCreate(created);
      onClose();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: 'white',
        padding: 20,
        borderRadius: 8,
        width: 480,
        maxWidth: '95%'
      }}>
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 8 }}>
            <label>Name</label><br/>
            <input required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%' }} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Company Name</label><br/>
            <input required value={companyName} onChange={e => setCompanyName(e.target.value)} style={{ width: '100%' }} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Email</label><br/>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%' }} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Username</label><br/>
            <input value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%' }} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Phone</label><br/>
            <input value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%' }} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Website</label><br/>
            <input value={website} onChange={e => setWebsite(e.target.value)} style={{ width: '100%' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
