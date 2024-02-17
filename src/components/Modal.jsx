import { useState } from "react";
import axios from "axios";

export default function Modal(props) {
  const { el, closeModalAdd, closeModalUD } = props;
  const [input, setInput] = useState({
    name: "",
    price: "",
    detail: "",
    categoryId: "",
    brandId: "",
    images: null
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setInput((prev) => ({ ...prev, images: e.target.files[0] }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("price", input.price);
      formData.append("detail", input.detail);
      formData.append("categoryId", input.categoryId);
      formData.append("brandId", input.brandId);
      formData.append("images", input.images);

      // validation
      const token = localStorage.getItem("token");
      const rs = await axios.post(
        "http://127.0.0.1:8000/admin/product",
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data", } }
      );
      console.log(rs.data);
      alert("Create new product ok!");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {/* Add Product */}
      <dialog id="add_product" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create new product</h3>
          <div className="">
            <form
              className="flex flex-col gap-5"
              method="dialog"
            >
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
                  placeholder="catedory id"
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
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex gap-5 justify-end">
                <button type="submit" className="btn" onClick={hdlSubmit}>Confirm</button>
                <button className="btn" onClick={closeModalAdd}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      {/* Update and Delete */}
      <dialog id="UD_product" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{el?.name}</h3>
          <div className="">{JSON.stringify(el)}</div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={closeModalUD}>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
