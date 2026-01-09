import api from "../../api/axios";
import { useEffect } from "react";
import {useContext} from 'react'
import AuthContext from "../../auth/authContext"

const AdminDashboard = () => {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    api.get("/users/admin").then(res => 
      console.log(res.data , user));
  }, []);

  return <div className="cont">
    <h1 className="text-xl">Admin Dashboard</h1>
    <div>{user?.username}</div>

  </div>

};

export default AdminDashboard;
