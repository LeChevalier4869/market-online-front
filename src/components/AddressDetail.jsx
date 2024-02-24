import axios from "axios";
import { useState, useEffect } from "react";
import AddressModal from "./addressModal";

export default function AddressDetail(props) {
  const { el, index, openModalMM, hdlDelete } = props;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text text-blue-500">Address {index}</h1>
        <div className="flex gap-5">
          <button
            onClick={() => openModalMM(el.id)}
            className="text text-green-500"
          >
            Edit
          </button>
          <button onClick={(e) => hdlDelete(e, el)} className="text text-red-500">
            delete
          </button>
        </div>
      </div>
      <div className="flex justify-start mt-2">
        <p className="w-[100px]">Number: {el.address}</p>
        <p className="w-[150px]">Postal code: {el.postalCode}</p>
        <p className="w-[120px]">Province: {el.province}</p>
        <p className="w-[110px]">District: {el.district}</p>
        <p className="w-[150px]">Sub district: {el.subDistrict}</p>
        <p className="w-[150px]">
          Main address: {el.isMainAddress === true ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}
