/* eslint-disable react-refresh/only-export-components */
// import { Outlet } from "react-router-dom"
import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
// import Footer from "./Footer"
import SideBar from "./SideBar"
import { useState } from "react"
import Login from "./Login"
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react"
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

const AppLayout = () => {
  const [token, setToken] = useState((localStorage.getItem('token'))?localStorage.getItem('token'):'');
  useEffect(() => {
    localStorage.setItem('token',token)
  }, [token])
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? <Login setToken={setToken} /> :
        <>
          <NavBar setToken={setToken}/>
          <hr className="border-gray-300" />
          <div className="flex w-full">
            <SideBar />
            <main className="w-[70%] mx-auto ml-[max(5vh,25px)] my-8 text-gray-600 text-base"><Outlet context={{token}}/></main>
          </div>

        </>
      }

    </div>
  )
}

export default AppLayout
