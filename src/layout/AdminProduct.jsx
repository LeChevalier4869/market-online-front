import useAdmin from "../hooks/useAdmin";
import Modal from "../components/Modal";
import ProductCardAdmin from "../components/ProductCardAdmin";

export default function AdminProduct() {
  const {
    product,
    setTrigger,
    editIdx,
    trigger,
    openModalAdd,
    closeModalAdd,
    openModalMM,
    closeModalMM,
    openModalEdit,
    closeModalEdit,
  } = useAdmin();

  return (
    <div className="">
      <div className="flex justify-end mr-5 mt-3 mb-3">
        <button className="btn btn-outline btn-info" onClick={openModalAdd}>
          Add
        </button>
      </div>

      <hr className="border border-base-300" />
      <br />
      <h2 className="text text-center text-xl">my Product</h2>
      <div className="text text-center flex justify-center mt-5">
        <div
          className="border border-lime-400 mb-5 min-h-96 min-w-[800px] w-[975px]
          flex flex-wrap
        "
        >
          {/* Open the modal using document.getElementById('ID').showModal() method */}

          <Modal
            el={product[editIdx]}
            closeModalAdd={closeModalAdd}
            closeModalMM={closeModalMM}
            openModalEdit={openModalEdit}
            closeModalEdit={closeModalEdit}
            setTrigger={setTrigger}
            trigger={trigger}
          />

          <div className="flex flex-wrap">
            {
              // console.log(product.products)
              product.map((el) => {
                return (
                  <ProductCardAdmin
                    key={el.id}
                    el={el}
                    setTrigger={setTrigger}
                    openModalMM={openModalMM}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
