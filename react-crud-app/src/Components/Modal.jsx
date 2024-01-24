import style from "../Style/home.module.css";

function Modal({ isOpen, onClose }) {
  const handleSave = () => {
    onClose()
  };

  return (
    <>
      {isOpen && (
        <div className={style.modal_overlay}>
          <div className={style.modal}>
            <h2 className={style.heading}>Add Customer</h2>

            <form>
              <label>Name</label>
              <input
                className={style.input}
                type="text"
                placeholder="Enter name"
              />
              <label>Email</label>
              <input
                className={style.input}
                type="text"
                placeholder="Enter email"
              />
            </form>

            <div className={style.buttonbox}>
              <button className={style.close_button} onClick={onClose}>
                Cancel
              </button>
              <button className={style.save_button} onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
