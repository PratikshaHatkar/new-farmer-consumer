import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("consumer");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || username.length < 3) {
      alert("Username must be at least 3 characters long");
      return false;
    }
    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters long");
      return false;
    }
    if (!["admin", "farmer", "consumer"].includes(role)) {
      alert("Invalid role selected");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await api.post("/auth/register", { username, password, role });
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-96 flex flex-col gap-6 animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          <option value="consumer">Consumer</option>
          <option value="farmer">Farmer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"
          } text-white font-semibold py-2 rounded-lg shadow-md transition transform hover:scale-105`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-600 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-purple-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;






// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("consumer");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const validateForm = () => {
//     if (!username || username.length < 3) {
//       alert("Username must be at least 3 characters long");
//       return false;
//     }
//     if (!password || password.length < 6) {
//       alert("Password must be at least 6 characters long");
//       return false;
//     }
//     if (!["admin", "farmer", "consumer"].includes(role)) {
//       alert("Invalid role selected");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       await api.post("/auth/register", { username, password, role });
//       alert("Registration successful. Please login.");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: "300px" }}>
//       <h2>Register</h2>

//       <input
//         type="text"
//         placeholder="Username"
//         required
//         autoComplete="username"
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         required
//         autoComplete="current-password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="consumer">Consumer</option>
//         <option value="farmer">Farmer</option>
//         <option value="admin">Admin</option>
//       </select>

//       <button type="submit" disabled={loading}>
//         {loading ? "Registering..." : "Register"}
//       </button>
//     </form>
//   );
// };

// export default Register;


// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("consumer");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await api.post("/auth/register", {
//         username,
//         password,
//         role,
//       });

//       alert("Registration successful. Please login.");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: "300px" }}>
//       <h2>Register</h2>

//       <input
//         type="text"
//         placeholder="Username"
//         required
//         autoComplete="username"
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         required
//         autoComplete="current-password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="consumer">Consumer</option>
//         <option value="farmer">Farmer</option>
//         <option value="admin">Admin</option>
//       </select>

//       <button type="submit" disabled={loading}>
//         {loading ? "Registering..." : "Register"}
//       </button>
//     </form>
//   );
// };

// export default Register;
