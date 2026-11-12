/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./UI/Title"
import ProductCard from "./UI/ProductCard"

const LatestCollection = () => {
    const {products} = useContext(ShopContext) 
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])
  return (
    <div className="my-10">
        <div className="text-center py-8 text-3xl">
            <Title text1={"LATEST"} text2={"COLLECTION"}/>
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Explore the latest collection featuring fresh styles and timeless elegance.</p>
        </div>

        {/* Rendering products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {latestProducts.map((item,index)=>{
               return <ProductCard key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            })}
        </div>
      
    </div>
  )
}

export default LatestCollection
