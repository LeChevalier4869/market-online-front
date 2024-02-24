import axios from "axios";
import { createContext, useState, useEffect } from "react";

const AddressContext = createContext();

function AddressContextProvider(props) {
  const [addr, setAddr] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("token");
      const addrByUser = await axios.get(`http://127.0.0.1:8000/address/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //console.log(addrByUser.data);
      setAddr(addrByUser.data.address);
    };
    run();
  }, [trigger]);

  const openModalAdd = () => {
    document.getElementById("add_address").showModal();
  };

  const openModalMM = (id) => {
    let idx = addr.findIndex((el) => el.id === id);
    setEditIdx(idx);
    document.getElementById("edit_address").showModal();
  };

  const closeModalAdd = () => {
    document.getElementById("add_address").close();
  };

  const openModalEdit = () => {
    document.getElementById("edit_address").showModal();
  };

  const closeModalEdit = () => {
    document.getElementById("edit_address").close();
  };

  const hdlDelete = async (e, el) => {
    try {
      e.stopPropagation();
      let idx = addr.findIndex((idx) => idx.id === el.id);
      if (!confirm(`Delete Address ${idx + 1} ?`)) {
        return;
      }
      const token = localStorage.getItem("token");
      let rs = await axios.delete(
        `http://127.0.0.1:8000/address/${el.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(rs);
      closeModalEdit();
      //setTrigger(prv => !prv);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <AddressContext.Provider value={ {addr, setAddr, 
    trigger, setTrigger, 
    editIdx, setEditIdx,
    openModalAdd, closeModalAdd,
    openModalMM, 
    openModalEdit, closeModalEdit,
    hdlDelete
    } }>
        {props.children}
    </AddressContext.Provider>
)
}

export { AddressContextProvider }
export default AddressContext;