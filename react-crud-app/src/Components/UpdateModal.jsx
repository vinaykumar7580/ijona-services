import { useContext, useState } from "react";
import style from "../Style/home.module.css";
import { AppContext } from "../Context/AppContext";

function UpdateModal({ isOpen, onClose, data }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const { handleUpdateData } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    let payload = {
      name: formData.name,
      email: formData.email,
    };

    handleUpdateData(data.id, payload);

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
            <h2 className={style.heading} style={{ color: "black" }}>
              Update Customer
            </h2>

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

export default UpdateModal;
