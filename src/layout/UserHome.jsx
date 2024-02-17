import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import useProduct from '../hooks/useProduct'

export default function UserHome() {
  const { product } = useProduct();
  //const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const run = async () => {
      //const productLanding = await axios.get('http://127.0.0.1:8000/product/landing');
      //console.log(productLanding.data);
      //setProducts(productLanding.data.products);

      const categoryLanding = await axios.get('http://127.0.0.1:8000/category/landing');
      //console.log(categoryLanding.data);
      setCategory(categoryLanding.data.categories);
    };
    run();
  }, [trigger]);

  return (
    <div className="home text-center flex flex-col items-center gap-10">
      Product
      <div className="border border-red-400 min-h-56 min-w-[800px] w-[1024px]">
        <h2>category landing</h2>
        <div className="flex">
        {
          category.map(el => (
            <CategoryCard
              key={el.id}
              el={el}
              product={product}
              setTrigger={setTrigger}
            />
          ))
        }
        </div>
      </div>
      <div className="border border-lime-400 min-h-96 min-w-[800px] w-[1024px]">
        <h2>product landing</h2>
        <div className="flex">
        {
          // console.log(product.products)
          product.products.map(el => {
            return (
              <ProductCard 
                key={el.id}
                el={el}
                setTrigger={setTrigger}
              />
            )
          })
        }
        </div>
      </div>
    </div>
  )
}
