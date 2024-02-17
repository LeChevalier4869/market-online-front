import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

export default function ProductDetail() {
    const [productDetail, setProductDetail] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const { productId } = useParams();

    useEffect(() => {
        const run =  async () => {
            const productById = await axios.get(`http://127.0.0.1:8000/product/${productId}`);
            console.log(productById.data);
            setProductDetail(productById.data);
        };
        run();
    }, [trigger]);

  return (
    <>
        <div className='text text-center mt-2 text-xl'>ProductDetail</div>
        <div className="border border-red-400 flex flex-col">
            <h3 className='text text-center'>{ JSON.stringify(productDetail) }</h3>
        </div>
    </>
  )
}
