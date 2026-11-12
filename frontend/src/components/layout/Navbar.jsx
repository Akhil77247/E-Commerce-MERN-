import { useContext, useState } from "react"
import { assets } from "../../assets/assets"
import { Link, NavLink } from "react-router-dom"
import { ShopContext } from "../../context/ShopContext";
const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logoutHandler = () => {
    navigate('/login');
    setToken('');
    localStorage.removeItem('token');
    setCartItems({});
  }

  return (
    <nav className="flex items-center py-5 justify-between font-medium">
      <Link to="/" ><img src={assets.logo} alt="" className="w-36" /></Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="" className="w-5 cursor-pointer" />
        <div className="group relative">
          <img onClick={token ? null : () => navigate('/login')} src={assets.profile_icon} alt="" className="w-5 cursor-pointer" />
          {token && <div className="group-hover:block hidden absolute right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-6 bg-slate-100 text-gray-400 rounded">
              <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logoutHandler} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-red-600 text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
        </Link>
        <img onClick={() => setIsVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="" />
      </div>

      {/* sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden text-gray-600 bg-white transition-all ${isVisible ? "w-full" : "w-0"}`}>
        <div className="flex flex-col text-gray-600">
          {/* back button */}
          <div onClick={() => setIsVisible(false)} className="flex items-center p-3 gap-4 cursor-pointer">
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>

          <NavLink className="hover:text-black py-2 pl-6 border border-b-0" onClick={() => setIsVisible(false)} to="/">HOME</NavLink>
          <NavLink className="hover:text-black py-2 pl-6 border border-b-0" onClick={() => setIsVisible(false)} to="/collection">COLLECTION</NavLink>
          <NavLink className="hover:text-black py-2 pl-6 border border-b-0" onClick={() => setIsVisible(false)} to="/about">ABOUT</NavLink>
          <NavLink className="hover:text-black py-2 pl-6 border" onClick={() => setIsVisible(false)} to="/contact">CONTACT</NavLink>
        </div>
      </div>

    </nav>
  )
}

export default Navbar
