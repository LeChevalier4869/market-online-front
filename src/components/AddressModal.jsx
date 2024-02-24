import { useEffect, useState } from "react";
import axios from "axios";

export default function AddressModal(props) {
  const {
    el,
    closeModalAdd,
    closeModalEdit,
    index
  } = props;

  // console.log(el);

  const [input, setInput] = useState({
    address: "",
    postalCode: "",
    province: "",
    district: "",
    subDistrict: "",
    isMainAddress: "",
  });

  const [data, setData] = useState({
    address: "",
    postalCode: "",
    province: "",
    district: "",
    subDistrict: "",
    isMainAddress: "",
  });

  const mainAddress = [
    { value: true, text: "Yes" },
    { value: false, text: "No" },
  ];

  useEffect(() => {
    try {
      const run = async () => {
        setData((prv) => ({
          ...prv,
          address: el?.address,
          postalCode: el?.postalCode,
          province: el?.province,
          district: el?.district,
          subDistrict: el?.subDistrict,
          isMainAddress: el?.isMainAddress,
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

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      // validation
      input.isMainAddress === ""
        ? console.log("Please select main address")
        : null;

      const token = localStorage.getItem("token");
      const rs = await axios.post("http://127.0.0.1:8000/address/new", input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(rs.data);
      alert("Add new address ok!");
      closeModalAdd();
      //setTrigger(prv => !prv);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const hdlUpdate = async (e) => {
    try {
      e.preventDefault();

      //console.log(el.id);
      // validation
      const token = localStorage.getItem("token");
      const rs = await axios.patch(
        `http://127.0.0.1:8000/address/${el.id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      //console.log(rs.data);
      alert("Update address ok!");
      closeModalEdit();
      //setTrigger(prv => !prv)
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {/* Modal Add Address */}
      <div className="">
        <dialog id="add_address" className="modal">
          <div className="modal-box w-[340px]">
            <h3 className="font-bold text-lg mb-5">Add new address</h3>
            <div className="">
              <form className="flex flex-col gap-5" method="dialog">
                <div className="flex flex-col gap-3">
                  <input
                    placeholder="Number"
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    name="address"
                    value={input.address}
                    onChange={hdlChange}
                  />
                  <input
                    placeholder="Postal code"
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    name="postalCode"
                    value={input.postalCode}
                    onChange={hdlChange}
                  />
                  <input
                    placeholder="Province"
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    name="province"
                    value={input.province}
                    onChange={hdlChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label for="district">District and Sub district</label>
                  <input
                    placeholder="District"
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    name="district"
                    value={input.district}
                    onChange={hdlChange}
                  />
                  <input
                    placeholder="Sub district"
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    name="subDistrict"
                    value={input.subDistrict}
                    onChange={hdlChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label for="isMainAddress">Main address</label>
                  <br />
                  <select
                    name="isMainAddress"
                    id="isMainAddress"
                    className="select select-success w-full max-w-xs"
                    value={input.isMainAddress}
                    onChange={hdlChange}
                  >
                    <option value={``}>Please select</option>
                    {mainAddress.map((el) => (
                      <option key={el.value} value={el.value}>
                        {el.text}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-5 justify-end">
                  <button type="submit" className="btn" onClick={hdlSubmit}>
                    Add
                  </button>
                  <button className="btn" onClick={closeModalAdd}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* Modal Edit Address */}
      <div className="">
        <dialog id="edit_address" className="modal">
          <div className="modal-box w-[340px]">
            <h3 className="font-bold text-lg mb-5">
              Address {index} (Edit id: {el?.id})
            </h3>
            <div className="">
              <form className="flex flex-col gap-5" method="dialog">
                <div className="flex flex-col gap-3">
                  <input
                    placeholder="Number"
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    name="address"
                    value={data?.address}
                    onChange={hdlChange}
                  />
                  <input
                    placeholder="Postal code"
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    name="postalCode"
                    value={data?.postalCode}
                    onChange={hdlChange}
                  />
                  <input
                    placeholder="Province"
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    name="province"
                    value={data?.province}
                    onChange={hdlChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label for="district">District and Sub district</label>
                  <input
                    placeholder="District"
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    name="district"
                    value={data?.district}
                    onChange={hdlChange}
                  />
                  <input
                    placeholder="Sub district"
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    name="subDistrict"
                    value={data?.subDistrict}
                    onChange={hdlChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label for="isMainAddress">Main address</label>
                  <br />
                  <select
                    name="isMainAddress"
                    id="isMainAddress"
                    className="select select-success w-full max-w-xs"
                    value={data?.isMainAddress}
                    onChange={hdlChange}
                  >
                    <option value={``}>Please select</option>
                    {mainAddress.map((el) => (
                      <option key={el.value} value={el.value}>
                        {el.text}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-5 justify-end">
                  <button type="submit" className="btn" onClick={hdlUpdate}>
                    Update
                  </button>
                  <button className="btn" onClick={closeModalEdit}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
