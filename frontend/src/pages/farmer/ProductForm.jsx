import {useNavigate , useParams} from "react-router-dom";
import api from "../../api/axios"
import {useState , useEffect} from "react"
const ProductForm = () => {
    const {id} = useParams()

    const [error , setError] = useState({});
    const [form , setForm] = useState({
        name:"" ,
        price:"",
        quantity:"",
        image:null
    })

    const [isEdit , setIsEdit]  = useState(false)

    // useEffect(() => {
    //     if(id){
    //         setIsEdit(true)
    //         api.get(`/farmer/${id}`)
    //         .then(res => {
    //             const {name , price , quantity} = res.data.product
    //             setForm({...form , name , price , quantity})
    //         }).catch(err => {
    //             console.error(err)
    //         })
    //     }
    // }, [id])
    
    
    const navigate = useNavigate()

    const validateForm = () =>{
        const newErrors = {}

        if(!form.name.trim()){
            newErrors.name = "Product name is required."
        }
        if(!form.price || isNaN(form.price) || Number(form.price) <= 0){
            newErrors.price = "Price should be greater than zero"
        }
        if(!form.quantity || isNaN(form.quantity) || Number(form.quantity) < 1){
            newErrors.quantity = "Quantity must be atleast one"
        }
        if(!form.image){
            newErrors.image = "Product image is required"
        }else{
            const allowedTypes = ["image/jpg" , "image/jpeg" , "image/png"]
            if(!allowedTypes.includes(form.image.type)){
                newErrors.image = "Only JPG, JPEG, PNG images allowed";
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
             if (form.image.size > maxSize) {
            newErrors.image = "Image size must be less than 2MB";
            }
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleChange = async(e) => {

        const {name , value , files} = e.target

        setForm({
            ...form,
            [name]:files ? files[0]:value

        })

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()) return;

        const formData = new FormData();
        formData.append("name" ,form.name)
        formData.append("price" ,form.price)
        formData.append("quantity" ,form.quantity)
        formData.append("image" ,form.image)

        try{
            // if(isEdit){
            //     await api.put(`/farmer/${id}` , formData , {
            //         headers: {
            //             "Content-Type": "multipart/form-data",
            //         },
            //     }).then(() => {
            //         alert("product updated.")
            //         navigate(-1)
            //     })

            // }
            // else{
                await api.post("/farmer/addProduct" , formData , {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }).then(() => {
                    alert("product added.")
                    navigate(-1)
                })

            //}
        }
        catch(err){
            console.error(err);
            alert("failed to submit product");
        }

       
    }

    return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="productForm max-w-md max-h-lg border-2 border-black p-3 ">     
           <h2 className="text-center">Add Product</h2>
           <form onSubmit={handleSubmit} className="">
           <button
           type="button"
           onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-600 
                 hover:text-green-600 mb-3 transition"
            >
          ← Back to Dashboard
         </button>

         <h2 className="text-center font-bold mb-3">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>

               <div>
               <label className="pr-2">Name:</label>
               <input name="name" value={form.name} onChange={handleChange} className="pl-2 border-2 border-grey rounded-lg w-full" type="text" / >
               {error.name && <p className="text-red-500 text-sm">{error.name}</p>}

               </div>

               <div>
               <label className="pr-2">Price:</label>
               <input name="price" value={form.price} onChange={handleChange} className="pl-2 border-2 border-grey rounded-lg w-full" type="text" / >
               {error.price && <p className="text-red-500 text-sm">{error.price}</p>}

               </div>

               <div>
               <label className="pr-2">Quantity:</label>
               <input name="quantity" value={form.quantity} onChange={handleChange} className="pl-2 border-2 border-grey rounded-lg w-full" type="text" / >
               {error.quantity && <p className="text-red-500 text-sm">{error.quantity}</p>}
               </div>

               <div>
               <label className="pr-2">Image:</label>
               <input name="image" onChange={handleChange} className="pl-2 border-2 border-grey rounded-lg w-full" type="file" / >
               {error.image && <p className="text-red-500 text-sm">{error.image}</p>}
               </div>

               <div className="text-center">
               <button type="submit" className="bg-red-700 p-2 w-full mt-3 rounded-md font-bold text-white text-center">
               {isEdit ? "Update" : "Add"}
               </button>

               </div>
  


           </form>
      </div>
      </div>
    );
  };

{/* 
  if(isEdit){
                await api.put(`/farmer/${id}` , formData , {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }).then(() => {
                    alert("product updated.")
                    navigate(-1)
                })

            }
            else{
                await api.post("/farmer/addProduct" , formData , {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }).then(() => {
                    alert("product added.")
                    navigate(-1)
                })

            }
        } */}

  
  export default ProductForm;
  