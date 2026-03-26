import React from 'react'
import {useNavigate , useParams} from "react-router-dom";
import {useState ,useEffect} from 'react'
import api from "../../api/axios"



const ProductDetails = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [product , setProduct] = useState(null)

    useEffect(() => {
        const fetchProductDetails = async () =>{
            try{
                const res = await api.get(`/consumer/productInfo/${id}`)
                setProduct(res.data.product)
            }
            catch(err){
               console.log(message.err)
            }

        }
        fetchProductDetails()

    } , [id])

    if(!product) {
      return <p>Loading...</p>
    }

  return (
    // <div className='border-2 max-w-[30vw] justify-center'>
    //   <div className="img">
    //           <img className="w-[15vw] h-[25vh] object-fit" 
    //           src={`http://localhost:5001/uploads/${product.farmerId._id}/${product.image}`} alt={product.name} />
            
    //         </div>

    //   <p>{product.name}</p>
    //   <p>₹{product.price} per kg</p>
    //   <p>{product.quantity} kg</p>
    //   <p>{product.farmerId.username}</p>
    //   <p>{product.farmerId.farmName}</p>
    //   <p>{product.farmerId.address}</p>
        
      
    // </div>

    <div className="min-h-screen flex justify-center items-center bg-gray-100">
    <div className="bg-white shadow-xl rounded-xl p-3 w-[28vw] hover:scale-[1.02] transition duration-300">
    <button
      onClick={() => navigate(-1)}
      className="mb-2 px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-full"
      >Back</button>
      {/* Image */}
      <div className="flex justify-center">
        
        <img
          className="w-[18vw] h-[30vh] object-cover rounded-lg shadow-md"
          src={`http://localhost:5001/uploads/${product.farmerId._id}/${product.image}`}
          alt={product.name}
        />
      </div>

      {/* Product Info */}
      <h2 className="text-2xl font-bold text-center mt-3">
        {product.name}
      </h2>

      <p className="text-center text-green-600 text-xl font-semibold">
        ₹ {product.price} / kg
      </p>

      <p className="text-center text-gray-600">
        Available: {product.quantity} kg
      </p>

      <hr className="my-3" />

      {/* Farmer Info */}
      <div className="bg-gray-50 p-1 rounded-lg">
        <h3 className="font-semibold text-lg mb-1">Farmer Details</h3>
        <p><b>Name:</b> {product.farmerId.username}</p>
        <p><b>Farm:</b> {product.farmerId.farmName}</p>
        <p><b>Address:</b> {product.farmerId.address}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-2">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition">
          Negotiate
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
          Buy Now
        </button>
      </div>
    </div>
  </div>

  )
}

export default ProductDetails
