import { useState } from "react";
import api from "../api/axios";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      login(res.data.token);

      const role = JSON.parse(localStorage.getItem("user")).role;
      navigate(`/${role}`);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-96 flex flex-col gap-6 animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Login
        </button>

        <p className="text-gray-600 text-sm text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;



// import { useState } from "react";
// import api from "../api/axios";
// import useAuth from "../auth/useAuth";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", {
//         username,
//         password,
//       });

//       login(res.data.token);

//       const role = JSON.parse(localStorage.getItem("user")).role;
//       navigate(`/${role}`);
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//       <p>
//   Don’t have an account? <a href="/register">Register</a>
// </p>

//     </form>
//   );
// };

// export default Login;
