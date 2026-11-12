import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {

  const {token,setToken,backendUrl,navigate} = useContext(ShopContext);
  const [currentState, setCurrentState] = useState('Login')
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
      if(currentState === 'SignUp'){
        const response = await axios.post(backendUrl + '/api/user/register',{name,email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message);
        }
        
      }
      else{
        const response = await axios.post(backendUrl + '/api/user/login',{email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    } 
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[token]);


  return (
    <form onSubmit={submitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center mb-2 mt-10 gap-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="w-full border border-gray-700 px-3 py-2" placeholder="Name" required />}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" className="w-full border border-gray-700 px-3 py-2" placeholder="Email" required />
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" className="w-full border border-gray-700 px-3 py-2" placeholder="Password" required />
      <div className="flex justify-between w-full text-sm -mt-2 ">
        <p className="cursor-pointer">Forget your Password?</p>
        {currentState === 'Login'
          ? <p onClick={()=>setCurrentState('SignUp')} className="text-blue-800 hover:underline cursor-pointer">Create account</p>
          : <div className="flex gap-1">
              <p>Already have account?</p>
              <p onClick={()=>setCurrentState('Login')} className="text-blue-800 cursor-pointer hover:underline">Login here</p>
            </div>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">{currentState === 'Login'? 'Signup' : 'Create'}</button>
    </form>
  )
}

export default Login
