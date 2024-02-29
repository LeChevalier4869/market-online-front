import { useEffect, useState } from "react";
import axios from "axios";

export default function Modal(props) {
  const { 
    el, 
    closeModalAdd, 
    closeModalMM, 
    openModalEdit, 
    closeModalEdit, 
    setTrigger, 
    trigger 
  } = props;
  
  const [input, setInput] = useState({
    name: "",
    price: "",
    detail: "",
    stock: "",
    unit: "",
    categoryId: "",
    brandId: "",
    images: null,
  });
  const [data, setData] = useState({
    name: "",
    price: "",
    detail: "",
    stock: "",
    unit: "",
    categoryId: "",
    brandId: "",
    images: null,
  });

  const category = [
    { value: true, text: "Yes" },
    { value: false, text: "No" },
  ];

  const brand = [
    { value: true, text: "Yes" },
    { value: false, text: "No" },
  ];

  useEffect(() => {
    try {
      const run = async () => {
        setData((prv) => ({
          ...prv,
          name: el?.name,
          price: el?.price,
          detail: el?.detail,
          stock: el?.stock,
          unit: el?.unit,
          categoryId: el?.categoryId,
          brandId: el?.brandId
      }));
      };
      run();
    } catch (err) {
      console.log(err.message);
    }
  }, [el?.id]);

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    setData((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlImageChange = (e) => {
    setInput((prev) => ({ ...prev, images: e.target.files[0] }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("price", input.price);
      formData.append("detail", input.detail);
      formData.append("stock", input.stock);
      formData.append("unit", input.unit);
      formData.append("categoryId", input.categoryId);
      formData.append("brandId", input.brandId);
      formData.append("images", input.images);

      // validation
      const token = localStorage.getItem("token");
      const rs = await axios.post(
        "http://127.0.0.1:8000/admin/product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(rs.data);
      alert("Create new product ok!");
      closeModalAdd();
      //setTrigger(prv => !prv);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const hdlDelete = async (e) => {
    try {
      e.stopPropagation();
      if (!confirm(`Delete ${el.name} ?`)) {
        return;
      }
      const token = localStorage.getItem("token");
      let rs = await axios.delete(
        `http://127.0.0.1:8000/admin/product/${el.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(rs);
      closeModalMM();
      //setTrigger(prv => !prv);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const hdlUpdate = async (e) => {
    try {
      e.preventDefault();

      delete data.images; 
      const output = { ...data };
      //console.log(output);
      // validation
      const token = localStorage.getItem("token");
      const rs = await axios.patch(`http://127.0.0.1:8000/admin/product/${el.id}`, output,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(rs.data.product);
      alert("Update product ok!");
      closeModalEdit();
      //setTrigger(prv => !prv)
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {/* Add Product */}
      <dialog id="add_product" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Create new product</h3>
          <div className="">
            <form className="flex flex-col gap-5" method="dialog">
              <div className="">
                <input
                  placeholder="name"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="name"
                  value={input.name}
                  onChange={hdlChange}
                />
                <input
                  placeholder="price"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="price"
                  value={input.price}
                  onChange={hdlChange}
                />
              </div>
              <div className="">
                <input
                  placeholder="detail"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="detail"
                  value={input.detail}
                  onChange={hdlChange}
                />
              </div>
              <div className="">
                <input
                  placeholder="stock"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="stock"
                  value={input.stock}
                  onChange={hdlChange}
                />
                <input
                  placeholder="unit"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="unit"
                  value={input.unit}
                  onChange={hdlChange}
                />
              </div>
              <div className="">
                <input
                  placeholder="category id"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="categoryId"
                  value={input.categoryId}
                  onChange={hdlChange}
                />
                <input
                  placeholder="brand id"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="brandId"
                  value={input.brandId}
                  onChange={hdlChange}
                />
              </div>
              <div className="">
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-info w-full max-w-xs"
                  name="images"
                  accept="images/*"
                  onChange={hdlImageChange}
                />
              </div>
              <div className="flex gap-5 justify-end">
                <button type="submit" className="btn" onClick={hdlSubmit}>
                  Confirm
                </button>
                <button className="btn" onClick={closeModalAdd}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      {/* Edit and Delete */}
      <dialog id="MM_product" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">{el?.name} (id: {el?.id})</h3>
          <div className="flex justify-around">
            <div className="">
              {el?.product_imgs?.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`Product Image ${index + 1}`}
                  className="size w-[130px] h-28 mb-5"
                />
              ))}
            </div>
            <div className="text text-start">
              <p>price: ${el?.price}</p>
              <p>detial: {el?.detail}</p>
              <p>stock: {el?.stock}</p>
              <p>unit: {el?.unit}</p>
            </div>
          </div>
          <div className="flex justify-around">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={openModalEdit}>
              Edit
            </button>
            <button className="btn" onClick={hdlDelete}>
              Delete
            </button>
            <button className="btn" onClick={closeModalMM}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* Edit to Update */}
      <dialog id="edit_product" className="modal">
      <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">{el?.name} (Edit id: {el?.id})</h3>
          <div className="">
            <form className="flex flex-col gap-5" method="dialog" onSubmit={hdlUpdate}>
              <div className="">
                <input
                  placeholder="name"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="name"
                  value={data.name}
                  onChange={hdlChange}
                />
                <input
                  placeholder="price"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="price"
                  value={data.price}
                  onChange={hdlChange}
                />
              </div>
              <div className="">
                <input
                  placeholder="detail"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="detail"
                  value={data.detail}
                  onChange={hdlChange}
                />
              </div>
              <div className="">
                <input
                  placeholder="stock"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="stock"
                  value={data.stock}
                  onChange={hdlChange}
                />
                <input
                  placeholder="unit"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="unit"
                  value={data.unit}
                  onChange={hdlChange}
                />
              </div>
              <div className="">
                <input
                  placeholder="category id"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="categoryId"
                  value={data.categoryId}
                  onChange={hdlChange}
                />
                <input
                  placeholder="brand id"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="brandId"
                  value={data.brandId}
                  onChange={hdlChange}
                />
              </div>
              <div className="flex gap-5 justify-end">
                <button type="submit" className="btn">
                  Update
                </button>
                <button type="reset" className="btn" onClick={closeModalEdit}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
