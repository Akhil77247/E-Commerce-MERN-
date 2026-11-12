/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useEffect, useState } from "react"
import Title from "./UI/Title"
import { ShopContext } from "../context/ShopContext";
import ProductCard from "./UI/ProductCard";
const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState([]);
    const { products } = useContext(ShopContext);
    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestSeller));
        setBestSeller(bestProduct.slice(0,5));
    }, [products])
    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={"BEST"} text2={"SELLER"} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Our best-selling collection, crafted for every occasion.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.map((item, index) => {
                    return <ProductCard key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                })}
            </div>
        </div>


    )
}

export default BestSeller
