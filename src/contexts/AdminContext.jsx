import axios from "axios";
import { createContext, useState, useEffect } from "react";

const AdminContext = createContext();

function AdminContextProvider(props) {
    const [product, setProduct] = useState([]);
    const [editIdx, setEditIdx] = useState(-1);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const run = async () => {
          const token = localStorage.getItem("token");
          const productByAdmin = await axios.get(
            `http://127.0.0.1:8000/admin/product/landing`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          //console.log(productByAdmin.data);
          setProduct(productByAdmin.data.products);
        };
        run();
      }, [trigger]);

      const openModalAdd = () => {
        document.getElementById("add_product").showModal();
      };
    
      const openModalMM = (id) => {
        let idx = product.findIndex(el => el.id === id);
        setEditIdx(idx);
        document.getElementById("MM_product").showModal();
      };
    
      const closeModalAdd = () => {
        document.getElementById("add_product").close()
      }
    
      const closeModalMM = () => {
        document.getElementById("MM_product").close()
      }

      const openModalEdit = () => {
        document.getElementById("edit_product").showModal();
      }

      const closeModalEdit = () => {
        document.getElementById("edit_product").close()
      }

    return (
        <AdminContext.Provider value={ {product, setProduct, 
        trigger, setTrigger, 
        editIdx, setEditIdx,
        openModalAdd, closeModalAdd,
        openModalMM, closeModalMM,
        openModalEdit, closeModalEdit
        } }>
            {props.children}
        </AdminContext.Provider>
    )
};

export { AdminContextProvider }
export default AdminContext;