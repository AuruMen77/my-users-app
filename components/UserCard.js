export default function UserCard({ user }) {
    const companyName = user.company?.name || (typeof user.company === 'string' ? user.company : '');
    return (
      <div style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        width: 280,
        boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
      }}>
        <h3 style={{ margin: '0 0 8px 0' }}>{user.name}</h3>
        <p style={{ margin: '0 0 6px 0', color: '#555' }}>{companyName}</p>
        <p style={{ margin: 0, fontSize: 14 }}>{user.email}</p>
      </div>
    );
  }
  