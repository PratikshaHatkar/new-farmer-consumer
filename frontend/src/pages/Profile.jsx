import React from "react";
import {useEffect , useState} from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

  const [profile , setProfile] = useState(null);
  const [form , setForm] = useState({
      phone:"",
      address:"",
      farmName:"",
  })

  useEffect(() => {
    api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      setProfile(res.data);
      setForm({
        phone: res.data.phone || "",
        address: res.data.address || "",
        farmName: res.data.farmName || "",
      });
    })
    .catch((err) => {
      console.error("Failed to fetch profile", err);
    });
  }, []);



  const handleSubmit = (e) => {
      e.preventDefault();
      api.put("/users/me" , form).then(()=>{
          alert("Profile updated.")
      })
  }
 
  return (
  

<div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
  <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

    {/* Back Button */}
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-sm text-gray-600 
                 hover:text-green-600 mb-3 transition"
    >
      ← Back to Dashboard
    </button>

    {/* Header */}
    <div className="mb-2 text-center">
      <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
      <p className="text-sm text-gray-500 mt-1">
        Manage your personal and farm details
      </p>
    </div>

    {/* Profile Info */}
    <div className="bg-gray-50 rounded-xl p-2 mb-1">
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Username:</span>{" "}
        {profile?.username}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Role:</span>{" "}
        <span className="capitalize text-green-600 font-medium">
          {profile?.role}
        </span>
      </p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-2">

      {/* Farm Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Farm Name
        </label>
        <input
          type="text"
          placeholder="Enter farm name"
          value={form.farmName}
          onChange={(e) =>
            setForm({ ...form, farmName: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-green-500 transition"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Phone
        </label>
        <input
          type="text"
          placeholder="Enter phone number"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-green-500 transition"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Address
        </label>
        <input
          type="text"
          placeholder="Enter address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-green-500 transition"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700
                   text-white font-semibold py-2.5 rounded-lg
                   transition duration-200 shadow-md hover:shadow-lg"
      >
        Update Profile
      </button>

    </form>
  </div>
</div>

  




//    <div className="profile">
//        <h2>Profile</h2>
//        <p>Username:{profile?.username}</p>
//        <p>Role:{profile?.role}</p>

//        <form onSubmit={handleSubmit}>
//            <input placeholder="FarmName" value={form.farmName} onChange={(e)=>{
//                setForm({...form , farmName: e.target.value})
//            }}></input>
//            <input placeholder="Phone" value={form.phone} onChange={(e)=>{
//                setForm({...form , phone: e.target.value})
//            }}></input>
//            <input placeholder="Address" value={form.address} onChange={(e)=>{
//                setForm({...form , address: e.target.value})
//            }}></input>

//            <button type="submit">Update </button>
//        </form>
//    </div>
  );
};

export default Profile;
