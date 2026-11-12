import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import CartTotal from "../components/CartTotal"
import Title from "../components/UI/Title"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"

const PlaceOrder = () => {

  const [method,setMethod] = useState('COD');

  const {navigate,token,cartItems,getCartAmount,deliveryFee,products,backendUrl,setCartItems}  = useContext(ShopContext);

  const [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data)=>({...data,[name]:value}))
  }

  const submitHandler = async (event)=>{
    event.preventDefault();
    try {
      const orderItems = [];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product=>(product._id === items)));
            if(itemInfo){
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let ordersData = {
        address:formData,
        items:orderItems,
        amount:deliveryFee + getCartAmount(),
      }
      

      switch  (method) {
        case 'COD':
          const response = await axios.post(backendUrl+'/api/order/COD',ordersData,{headers:{token}});
          if(response.data.success){
            setCartItems({});
            navigate('/orders')
          }
          else{
            toast.error(response.data.message); 
            // console.log(response.data.message);
          }
          break;
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', ordersData,{headers:{token}});
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data;
            window.location.replace(session_url);
          }
          else{
            toast.error(responseStripe.data.message);
          }
          break;
      
        default:
          break;
      }
    } 
    catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col sm:flex-row gap-4 pt-5 justify-between sm:pt-14 min-h-[80vh] border-t">
      {/* ---------Left Side---------- */}
      <div className="flex flex-col w-full gap-4 sm:max-w-120">
        <div className="text-xl sm:text-2xl mt-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="First name"/>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Last name"/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Email Address"/>
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Street"/>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="City"/>
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="State"/>
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Zip code"/>
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Country"/>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Phone"/>
      
      </div>
      {/* ---------Right Side--------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal/>
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* ----------Payment Options---------- */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex items-center gap-3 px-3 p-2 cursor-pointer hover:bg-gray-100">
              <p onClick={()=>setMethod('stripe')} className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe'?'bg-blue-700':''}`}></p>
              <img className="h-4" src={assets.stripe_logo} alt="" />
            </div>
            <div className="flex items-center gap-3 px-3 p-2 cursor-pointer hover:bg-gray-100">
              <p onClick={()=>setMethod('razor')} className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razor'?'bg-blue-700':''}`}></p>
              <img className="h-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div className="flex items-center gap-3 px-3 p-2 cursor-pointer hover:bg-gray-100">
              <p onClick={()=>setMethod('COD')} className={`min-w-3.5 h-3.5 border rounded-full ${method === 'COD'?'bg-blue-700':''}`}></p>
              <p className="text-gray-500 mx-4 text-sm font-medium">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm cursor-pointer">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
