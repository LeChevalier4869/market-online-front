import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function ProductDetail() {
  const [productDetail, setProductDetail] = useState([]);
  const [cartByUser, setCartByUser] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const { productId } = useParams();
  const product = productDetail?.product;
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const run = async () => {
      const productById = await axios.get(
        `http://127.0.0.1:8000/product/${productId}`
      );
      //console.log(productById.data);
      setProductDetail(productById.data);

      const token = localStorage.getItem('token');
      if(!token) { return }
      const cart = await axios.get(`http://127.0.0.1:8000/cart/`,
      { headers: { Authorization: `Bearer ${token}` } } );
       console.log(cart.data);
       setCartByUser(cart.data);

    };
    run();
  }, [trigger]);

  const quantity = useState({ quantity: Number(1) });

  const hdlCart = async (e) => {
    //console.log(cartByUser);
    //console.log(quantity[0]);
    try {
      e.preventDefault();
      const token = localStorage.getItem('token');
      if(!token) { return }
      const toCart = await axios.post(`http://127.0.0.1:8000/cart/${cartByUser.cart.id}/${productId}`, quantity[0],
      { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.log(err.message);
    } finally {
      user?.id ? navigate("/cart") : navigate("/login");
    }
  };

  const hdlFavorite = async (e) => {
    e.preventDefault();
    user?.id ? navigate("/favorite") : navigate("/login");
  };

  return (
    <>
      <div className="text text-center mt-5 text-xl">ProductDetail</div>
      <div
        className="mt-5 flex
        justify-center
      "
      >
        <div
          className="border border-green-500 my-5 mx-5 min-w-[800px] min-h-[600px]
            w-[975px] h-[700px] flex justify-around p-5
        "
        >
          <div className="img ">
            {product?.product_imgs?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`Product Image ${index + 1}`}
                className="size w-[400px] h-[400px]"
              />
            ))}
            <div className="text">
              <h4 className="text text-xl text-center mt-5">Details</h4>
              <p className="text m-3">{product?.detail}</p>
            </div>
          </div>
          <div
            className="
             min-w-[500px] min-h-[300px] h-[400px]
          "
          >
            {/* <h3 className="text text-center text-wrap">
                {JSON.stringify(productDetail)}
              </h3> */}
            <div
              className="
                min-w-[500px] min-h-[300px] h-[400px]
                flex flex-col gap-8
            "
            >
              <h2 className="text text-center text-2xl">{product?.name}</h2>
              <p className="text-xl">Price: ${product?.price}</p>
              <p className="text-xl">Stock: {product?.stock}</p>
              <p className="text-xl">Unit: {product?.unit}</p>
              <p className="text-xl">Category: {product?.category?.name}</p>
              <p className="text-xl">Brand: {product?.brand?.name}</p>
            </div>

            <div
              className="
                min-w-[500px] min-h-[300px] h-[300px]
                flex justify-end items-end p-[60px]
                gap-10
            "
            >
              <button onClick={hdlCart} className="btn btn-outline btn-info">
                Add to cart
              </button>
              <button
                onClick={hdlFavorite}
                className="btn btn-outline btn-error"
              >
                Add to favorite
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
