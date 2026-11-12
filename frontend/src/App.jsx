import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer/>
      <Outlet/>
    </div>
  )
}
export default App
