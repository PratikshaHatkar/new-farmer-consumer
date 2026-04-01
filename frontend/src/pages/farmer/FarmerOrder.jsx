import React, { useEffect, useState } from "react";
import api from "../../api/axios"

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  // 📥 Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/order-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  // 🔄 Update Status
  const updateStatus = async (id, status) => {
    try {
      await api.put(
        `/api/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Product</th>
            <th>Buyer</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.productId?.name}</td>
              <td>{order.buyerId?.username}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>

              <td>
                <button onClick={() => updateStatus(order._id, "accepted")}>
                  Accept
                </button>

                <button onClick={() => updateStatus(order._id, "rejected")}>
                  Reject
                </button>

                <button onClick={() => updateStatus(order._id, "deliverd")}>
                  Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerOrders;