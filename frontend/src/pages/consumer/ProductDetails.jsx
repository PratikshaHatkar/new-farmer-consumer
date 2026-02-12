import React from 'react'
import {useNavigate , useParams , useState ,useEffect} from "react-router-dom";
import api from "../../api/axios"



const ProductDetails = () => {
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

  return (
    <div>
        
      
    </div>
  )
}

export default ProductDetails
