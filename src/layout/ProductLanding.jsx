import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import useProduct from "../hooks/useProduct";
import { useParams } from "react-router-dom";

export default function ProductLanding() {
  const { categoryName } = useParams();
  const [product, setProduct] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const run =  async () => {
      const productByCat = await axios.get(`http://127.0.0.1:8000/product?category=${categoryName}`);
      console.log(productByCat.data);
      setProduct(productByCat.data.product);
  };
  run();
  }, [trigger]);

  return (
    <div className="text text-center flex justify-center">
      <div className="border border-lime-400 mt-5 min-h-96 min-w-[800px] w-[1024px]">
        <h2>Product landing</h2>
        <div className="flex">
          {
            // console.log(product.products)
            product.map((el) => (

                <ProductCard key={el.id} el={el} setTrigger={setTrigger} />

            ))
          }
        </div>
      </div>
    </div>
  );
}
