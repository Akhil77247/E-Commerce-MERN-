import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import SearchBar from "../UI/SearchBar";
import ShopContextProvider from "../../context/ShopContext";

const MainLayout = () => {
  return (
    <>
      <ShopContextProvider>
        <Navbar />
        <SearchBar />
        <main className="min-h-screen"><Outlet /></main>
        <Footer />
      </ShopContextProvider>
    </>
  );
};

export default MainLayout;