import axios from "axios";
import { useState, useEffect } from "react";
import AddressModal from "./addressModal";

export default function AddressDetail(props) {
  const { el, index, hdlOpenlUpdate } = props;

  const [addr, setAddr] = useState([]);
  const [trigger, setTrigger] = useState(false);

//   useEffect(() => {
//     try {
//         const run = async () => {
//             const token = localStorage.getItem("token");
//             console.log(el.id);
//             const address = await axios.get(
//               `http://127.0.0.1:8000/address/${el.id}`,
//               {
//                 headers: { Authorization: `Bearer ${token}` },
//               }
//             );
//             // console.log(address);
//           //   typeof addr === 'array' ? console.log('yes') : console.log('no')
//           //   console.log(typeof(addr));
//             setAddr([address.data.address]);
//           };
//           run();
//     } catch (err) {
//         console.log(err.message);
//     }
//   }, []);

  const hdlDelete = (e) => {};

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text text-blue-500">Address {index}</h1>
        <div className="flex gap-5">
          <button
            onClick={() => hdlOpenlUpdate(el?.id)}
            className="text text-green-500"
          >
            Edit
          </button>
          <button onClick={hdlDelete} className="text text-red-500">
            delete
          </button>
        </div>
      </div>
      <div className="flex justify-start mt-2">
        <p className="w-[100px]">Number: {el?.address}</p>
        <p className="w-[150px]">Postal code: {el?.postalCode}</p>
        <p className="w-[120px]">Province: {el?.province}</p>
        <p className="w-[110px]">District: {el?.district}</p>
        <p className="w-[150px]">Sub district: {el?.subDistrict}</p>
        <p className="w-[150px]">
          Main address: {el?.isMainAddress === true ? "Yes" : "No"}
        </p>
      </div>

      {/* Modal Update */}

      <AddressModal key={el?.id} el={el} index={index} />
    </div>
  );
}
