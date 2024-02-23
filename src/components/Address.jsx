import axios from "axios";
import { useState, useEffect } from "react";
import AddressDetail from "./AddressDetail";

export default function Address(props) {
  const [addressData, setAddressData] = useState([]);
  const {trigger, setTrigger} = props;
  const [editIdx, setEditIdx] = useState(-1);
  const [input, setInput] = useState({
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
    const run = async () => {
      const token = localStorage.getItem("token");
      const address = await axios.get(`http://127.0.0.1:8000/address/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(address.data.address);
      setAddressData(address.data.address);
    };
    run();
  }, []);

  const hdlAdd = (e) => {
    e.preventDefault();
    document.getElementById("add_address").showModal();
  };

  const hdlCancelAdd = (e) => {
    document.getElementById("add_address").close();
  };

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      // validation
      input.isMainAddress === "" 
      ? console.log('Please select main address')
      : null

      const token = localStorage.getItem("token");
      const rs = await axios.post(
        "http://127.0.0.1:8000/address/new",
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      console.log(rs.data);
      alert("Add new address ok!");
      hdlCancelAdd();
      //setTrigger(prv => !prv);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const hdlOpenlUpdate = (id) => {
    let idx = addressData.findIndex((el) => el.id === id);
    console.log(id);
    console.log(idx);
    setEditIdx(idx);
    document.getElementById("edit_address").showModal();
  };

  return (
    <div className="text">
      <h1 className="text text-2xl text-center mt-2">My address</h1>
      <div className="flex justify-end m-2 px-3">
        <button
          onClick={hdlAdd}
          className="border border-blue-500 p-2 rounded-md"
        >
          Add new address
        </button>
      </div>
      <div
        className="flex justify-center m-5 w-[808px] h-[360px]
        border border-yellow-500 p-3 whitespace-wrap overflow-scroll
        px-2 "
      >
        <div className="flex flex-col gap-10">
            {console.log(editIdx)}
          {addressData.map((el, index) => (
            <AddressDetail 
            key={el.id} 
            el={addressData[editIdx]} 
            index={index}
            mainAddress={mainAddress}
            hdlOpenlUpdate={hdlOpenlUpdate}
            />
          ))}
        </div>
      </div>

      {/* Modal Add */}

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
                      <option key={el.value} value={el.value}>{el.text}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-5 justify-end">
                  <button type="submit" className="btn" onClick={hdlSubmit}>
                    Add
                  </button>
                  <button className="btn" onClick={hdlCancelAdd}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>

    </div>
  );
}
