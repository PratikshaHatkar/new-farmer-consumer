// import React, { useEffect, useState } from "react";
// import api from "../../api/axios"

// const FarmerOrders = () => {
//   const [orders, setOrders] = useState([]);

//   const token = localStorage.getItem("token");

//   // 📥 Fetch Orders
//   const fetchOrders = async () => {
//     try {
//       const res = await api.get("/orders/order-list", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setOrders(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);


//   // 🔄 Update Status
//   const updateStatus = async (id, status) => {
//     try {
//       await api.put(
//         `/api/orders/${id}`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       fetchOrders();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Orders</h2>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Buyer</th>
//             <th>Qty</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id}>
//               <td>{order.productId?.name}</td>
//               <td>{order.buyerId?.username}</td>
//               <td>{order.quantity}</td>
//               <td>{order.status}</td>

//               <td>
//                 <button onClick={() => updateStatus(order._id, "accepted")}>
//                   Accept
//                 </button>

//                 <button onClick={() => updateStatus(order._id, "rejected")}>
//                   Reject
//                 </button>

//                 <button onClick={() => updateStatus(order._id, "deliverd")}>
//                   Delivered
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FarmerOrders;

import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  // 📥 Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/order-list", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
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
        `/orders/${id}`,
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Farmer Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-3">Product</th>
                <th className="p-3">Buyer</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {order.productId?.name}
                  </td>

                  <td className="p-3 text-gray-600">
                    {order.buyerId?.username}
                  </td>

                  <td className="p-3">{order.quantity}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : order.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : order.status === "deliverd"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() =>
                        updateStatus(order._id, "accepted")
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(order._id, "rejected")
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(order._id, "deliverd")
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No orders found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerOrders;