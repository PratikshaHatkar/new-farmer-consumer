import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null; // hide navbar on login page

  // style={{ display: "flex", gap: "15px", padding: "10px", alignItems:"center" ,display: flex ,
  // justify-content: center ,
  // gap: 30px}}

  return (
    <nav className="flex gap-[30px] p-[10px] items-center justify-center text-lg">
      {/* <span>
        Role: <b>{user.role}</b>
      </span> */}

      {/* Admin only */}
      {user.role === "admin" && (
        <div>
            {/* <Link to="/farmer">Admin Dashboard</Link> */}
            <Link to="/admin">Admin</Link>

        </div>


      )}

      {/* Admin + Farmer */}
      {(user.role === "admin" || user.role === "farmer") && (
        <div>
          {/* <Link to="/farmer">Farmer Dashboard</Link> */}
            <Link to="/farmer">Farmer</Link>
    
        </div>
      )}

      {/* Everyone */}
      <div>
      {/* <Link to="/consumer">Consumer Dashboard</Link> */}
      <Link to="/consumer">Consumer</Link>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
