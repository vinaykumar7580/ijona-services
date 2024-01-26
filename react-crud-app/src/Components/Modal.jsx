import { useContext, useState } from "react";
import style from "../Style/home.module.css";
import { AppContext } from "../Context/AppContext";

function Modal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const { handleAddData } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    handleAddData(formData);

    setFormData({
      name: "",
      email: "",
    });
    onClose();
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
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>Email</label>
              <input
                className={style.input}
                type="text"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
