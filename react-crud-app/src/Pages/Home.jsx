import style from "../Style/home.module.css";
import logo from "../Components/app-store.png";
import { useContext, useState } from "react";
import Modal from "../Components/Modal";
import { AppContext } from "../Context/AppContext";
import UpdateModal from "../Components/UpdateModal";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const { user, data, page, setPage, handleLogout, handleDeleteData } =
    useContext(AppContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUpdateModal = (id, name, email) => {
    setUpdateData({ id, name, email });
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  console.log("updateData", updateData);

  return (
    <div className={style.home}>
      <nav>
        <div className={style.logobox}>
          <img src={logo} alt="logo" />
        </div>
        <div className={style.profilebox}>
          <p className={style.profile_name}>{user.username}</p>
          <button className={style.logout_button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main>
        <div className={style.heading_box}>
          <h2 className={style.heading}>User Details</h2>
          <button className={style.addbutton} onClick={openModal}>
            Add+
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Official Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((el) => (
                  <tr key={el._id}>
                    <td>{el._id}</td>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>
                      <span
                        className={style.edit}
                        onClick={() =>
                          openUpdateModal(el._id, el.name, el.email)
                        }
                      >
                        Edit
                      </span>
                      <UpdateModal
                        isOpen={isUpdateModalOpen}
                        onClose={closeUpdateModal}
                        data={updateData}
                      />
                    </td>
                    <td>
                      <img
                        className={style.delete_button}
                        onClick={() => handleDeleteData(el._id)}
                        src="https://cdn-icons-png.flaticon.com/128/6221/6221968.png"
                        alt="delete"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className={style.pagination}>
          <div>
            <button
              className={style.previous_button}
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >{`<`}</button>
            <span className={style.page}>{page}</span>
            <button
              className={style.next_button}
              onClick={() => setPage(page + 1)}
            >{`>`}</button>
          </div>
        </div>
      </main>
      <br />
    </div>
  );
}
export default Home;
