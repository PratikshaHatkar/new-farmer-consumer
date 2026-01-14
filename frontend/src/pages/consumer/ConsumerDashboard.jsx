import api from "../../api/axios";
import { useEffect } from "react";

import Button from 'react-bootstrap/Button';
import {useContext} from "react";
import AuthContext from "../../auth/authContext";
import {useState} from "react";
import {useNavigate} from "react-router-dom"


import {Link} from "react-router-dom"
import { FaUser } from "react-icons/fa";

const ConsumerDashboard = () => {

  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
  // console.log({user})
  const [products , setProducts] = useState([])
  const [productCount , setProductCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    // api.get("/users/consumer").then(res => console.log(res.data));

    api.get("/consumer/all").then((res) => {
      setProducts(res.data.product)
    })


    // const fetchProducts = async () => {
    //   try {
    //     const res = await api.get("/all");
    //     setProducts(res.data.product);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    // fetchProducts();

  }, []);




  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return <>
   <div className="cont flex">

    <div className="left bg-green-500 h-[100vh] w-[20vw] fixed">  
    <h1 className="text-xl pl-5 h-12 pt-4">Consumer Dashboard</h1>
    <hr />

    <div className="Profile text-lg pl-5 pt-0.5 h-14">
      <div className="name">{user?.username}</div>
      <div className="role">Consumer Account</div>
    </div>
    <hr />

    <div   className="product text-lg pl-5 h-14">
       Products
    </div>
    

    <div className="negotiation text-lg pl-5 h-14">
      Negotiation
    </div>
    
    <div className="analysis text-lg pl-5 h-14">
      Analysis
    </div>

    <button className="logout text-lg pl-5 h-14 fixed bottom-0" onClick={logout}>Logout</button>
 

    </div>
    <div className="right h-[100vh] w-[75vw] p-4 absolute right-4">

      <div className="username flex justify-end text-[15px]">
      <Link  className="profile-icon">  
      {/* to="/farmer/profile" change route */}
      <FaUser size={24} />
    </Link>
        Welcome , {user?.username}</div>
      <hr />
        <div className="first flex justify-between p-3">
        <div className="l">
        <h2>My Produce</h2>
 


      </div>
    
    </div>

    <div className="main">
      <div className="result flex gap-[30px] justify-center">
        <div className="1 w-[15vw] border-4 rounded-lg flex flex-col items-center	">
          <span>Total Orders</span>
          <span>0</span>
        </div>
        <div className="2 w-[15vw] border-4 rounded-lg flex flex-col items-center	">
        <span>Active Orders</span>
          <span>0</span></div>
        <div className="3 w-[15vw] border-4 rounded-lg flex flex-col items-center	">
        <span>Total Sales</span>
          <span>0</span></div>
        <div className="4 w-[15vw] border-4 rounded-lg flex flex-col items-center	">
        <span>Negotiation</span>
          <span>0</span></div>
      </div>

      <div className="input pt-4 pl-3">
        <input value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} className="border-2 rounded-lg border-black w-[30vw] p-1" placeholder="search" type="text" />
      </div>

      <div className="cards pt-3 flex flex-wrap gap-2.5">
      {products.length > 0 && products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((p) =>{

     return(

        <div key={p._id} className="p-2 border-2 rounded-md w-[17vw] h-[40vh] items-center">
          <div className="img">
              <img className="w-full h-[25vh] object-fit" 
              src={`http://localhost:5001/uploads/${p.farmerId}/${p.image}`} alt={p.name} />
            
            </div>

            <div className="name flex justify-between">
              <span>{p.name}</span>
              <span>₹ {p.price} /kg</span>
             
          </div>
          {/* <span> {p.quantity}kg</span> */}

          </div>

        ) 

})}

  

      </div>

      
    </div>


    </div>


  </div>

  </>
  
};

export default ConsumerDashboard;
