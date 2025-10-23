export default function Home() {
    return (
      <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
        <h1>Welcome to My Users App 👋</h1>
        <p>
          This is the homepage. You can view all users by visiting{" "}
          <a href="/users" style={{ color: 'blue', textDecoration: 'underline' }}>
            /users
          </a>.
        </p>
      </div>
    );
  }
  