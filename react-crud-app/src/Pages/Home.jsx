import style from "../Style/home.module.css";
import logo from "../Components/app-store.png";
import { useState } from "react";
import Modal from "../Components/Modal";

let data = [
  {
    id: 1,
    name: "vinay hatwar",
    email: "vinay@gmail.com",
  },
  {
    id: 2,
    name: "vinay hatwar",
    email: "vinay@gmail.com",
  },
  {
    id: 3,
    name: "vinay hatwar",
    email: "vinay@gmail.com",
  },
  {
    id: 4,
    name: "vinay hatwar",
    email: "vinay@gmail.com",
  },
  {
    id: 5,
    name: "vinay hatwar",
    email: "vinay@gmail.com",
  },
];

function Home() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.home}>
      <nav>
        <div className={style.logobox}>
          <img src={logo} alt="logo" />
        </div>
        <div className={style.profilebox}>
          <p className={style.profile_name}>rahul</p>
          <button className={style.logout_button}>Logout</button>
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
                  <tr key={el.id}>
                    <td>{el.id}</td>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>
                      <span className={style.edit}>Edit</span>
                    </td>
                    <td>
                      <img
                        className={style.delete_button}
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
