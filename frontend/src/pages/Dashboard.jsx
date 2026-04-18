import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth0();

  if (!isAuthenticated) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome {user.name}</h2>
      <p>{user.email}</p>

      <button onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
