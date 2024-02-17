import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import ProductCardAdmin from "../components/ProductCardAdmin";

export default function AdminProduct() {
  const { user } = useAuth();
  const [product, setProduct] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [editIdx, setEditIdx] = useState(-1);

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("token");
      const productByAdmin = await axios.get(
        `http://127.0.0.1:8000/admin/product/landing`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(productByAdmin.data);
      setProduct(productByAdmin.data.products);
    };
    run();
  }, [trigger]);

  const openModalAdd = () => {
    document.getElementById("add_product").showModal();
  };

  const openModalUD = (id) => {
    let idx = product.findIndex(el => el.id === id);
    setEditIdx(idx);
    document.getElementById("UD_product").showModal();
  };

  const closeModalAdd = () => {
    document.getElementById("add_product").close()
  }

  const closeModalUD = () => {
    document.getElementById("UD_product").close()
  }

  return (
    <div className="">
      <div className="flex justify-end mr-5 mt-3 mb-3">
        <button className="btn btn-outline btn-info" onClick={openModalAdd}>Add</button>
      </div>

      <hr className="border border-base-300" />
      <br />
      <h2 className="text text-center text-xl">my Product</h2>
      <div className="text text-center flex justify-center mt-5">
        <div className="border border-lime-400 min-h-96 min-w-[800px] w-[1024px]">
          
          {/* Open the modal using document.getElementById('ID').showModal() method */}

          <Modal el={product[editIdx]} closeModalAdd={closeModalAdd} closeModalUD={closeModalUD} />

          <div className="flex">
            {
              // console.log(product.products)
              product.map((el) => {
                return (
                  <ProductCardAdmin key={el.id} el={el} setTrigger={setTrigger} openModalUD={openModalUD} />
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
