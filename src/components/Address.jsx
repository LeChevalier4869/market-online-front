import axios from "axios";
import { useState, useEffect } from "react";
import AddressDetail from "./AddressDetail";
import useAddress from "../hooks/useAddress";
import AddressModal from "./addressModal";

export default function Address() {
  const {
    addr,
    setTrigger,
    editIdx,
    trigger,
    openModalAdd,
    closeModalAdd,
    openModalMM,
    closeModalMM,
    openModalEdit,
    closeModalEdit,
    hdlDelete
  } = useAddress();

  return (
    <div className="text">
      <h1 className="text text-2xl text-center mt-2">My address</h1>
      <div className="flex justify-end m-2 px-3">
        <button
          onClick={openModalAdd}
          className="border border-blue-500 p-2 rounded-md"
        >
          Add new address
        </button>
      </div>
      <div
        className="flex justify-center m-5 w-[808px] h-[360px]
        border border-yellow-500 p-3 whitespace-wrap overflow-y-auto
        px-2 "
      >
        {/* Open Modal */}
        <AddressModal
          el={addr[editIdx]}
          closeModalAdd={closeModalAdd}
          closeModalEdit={closeModalEdit}
          setTrigger={setTrigger}
          trigger={trigger}
          index={editIdx + 1}
        />

        <div className="flex flex-col gap-10">
          {console.log(editIdx)}
          {addr.map((el, index) => (
            <AddressDetail
              key={el.id}
              el={el}
              index={index + 1}
              openModalMM={openModalMM}
              hdlDelete={hdlDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
