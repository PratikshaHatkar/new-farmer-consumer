import api from "../../api/axios";
import { useEffect } from "react";

const ConsumerDashboard = () => {
  useEffect(() => {
    api.get("/users/consumer").then(res => console.log(res.data));
  }, []);

  return <h1 className="text-xl">Consumer Dashboard</h1>;
};

export default ConsumerDashboard;
