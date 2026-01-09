import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-[20px] py-[15px] bg-white shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-green-700 text-2xl font-bold">FarmDirect</span>
        </div>
        <div className="flex items-center gap-5">
          <button
            className="text-gray-700 hover:text-green-700"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col justify-center items-center text-center flex-1 px-5">
        <div className="mt-10 inline-flex items-center gap-2 bg-[#f0e7d9] px-4 py-2 rounded-full text-sm text-gray-700">
          🌱 Direct Farmer-to-Consumer Marketplace
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold mt-6 text-gray-900">
          Fresh From <span className="text-green-700">Farm</span> <br />
          Direct To <span className="text-orange-500">You</span>
        </h1>

        <p className="mt-5 text-gray-600 text-lg max-w-xl">
          Connect directly with local farmers. Negotiate fair prices. Get the
          freshest produce delivered to your doorstep.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
            onClick={() => navigate("/consumer")}
          >
            Start Shopping →
          </button>

          <button
            className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition"
            onClick={() => navigate("/farmer")}
          >
            Join as Farmer →
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
