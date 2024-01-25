import { useContext, useState } from "react";
import style from "../Style/register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { handleLogin } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    fetch(`https://concerned-puce-buffalo.cyclic.app/user/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("login", res);
        alert(`${res.msg}`);
        localStorage.setItem("token", res.token);
        handleLogin(res.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });

    setFormData({
      username: "",
      password: "",
    });
  };

  const { username, password } = formData;

  return (
    <div className={style.register}>
      <div className={style.container}>
        <h2 className={style.heading}>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            className={style.input}
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            className={style.input}
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <button className={style.button} type="submit">
            Login
          </button>
        </form>
        <div className={style.para}>
          <p>
            If you don't have account:{" "}
            <Link to={"/register"}>
              <span style={{ fontWeight: "bold" }}>Register</span>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
