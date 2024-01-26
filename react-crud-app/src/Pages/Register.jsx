import { useContext, useState } from "react";
import style from "../Style/register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    fetch(`https://concerned-puce-buffalo.cyclic.app/user/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log("register", res);
        toast({
          title:`${res.msg}` ,
          status: 'success',
          position:"top",
          duration: 3000,
          isClosable: true,
        })
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: 'Something Went Wrong!',
          status: 'error',
          position:"top",
          duration: 3000,
          isClosable: true,
        })
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
        <h1 className={style.heading}>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            className={style.input}
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            className={style.input}
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <button className={style.button} type="submit">
            Register
          </button>
        </form>
        <div className={style.para}>
          <p>
            If you have already account:{" "}
            <Link to={"/login"}>
              <span style={{ fontWeight: "bold" }}>Login</span>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Register;
