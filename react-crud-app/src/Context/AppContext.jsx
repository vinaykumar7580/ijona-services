import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = React.createContext();

function AppContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  useEffect(() => {
    if (token) {
      handleGetUser();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      handleGetData();
    }
  }, [page, token]);

  const handleGetUser = () => {
    if (token) {
      fetch(`https://concerned-puce-buffalo.cyclic.app/user/userdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("user", res);
          setUser(res);
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Something Went Wrong!",
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  const handleGetData = () => {
    fetch(`https://concerned-puce-buffalo.cyclic.app/data/get/${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(true);
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast({
          title: "Something Went Wrong!",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleAddData = (data) => {
    fetch(`https://concerned-puce-buffalo.cyclic.app/data/add`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        toast({
          title: `${res.msg}`,
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        handleGetData();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Something Went Wrong!",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleUpdateData = (id, data) => {
    fetch(`https://concerned-puce-buffalo.cyclic.app/data/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        toast({
          title: `${res.msg}`,
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        handleGetData();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Something Went Wrong!",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleDeleteData = (id) => {
    fetch(`https://concerned-puce-buffalo.cyclic.app/data/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        toast({
          title: `${res.msg}`,
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        handleGetData();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Something Went Wrong!",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const value = {
    token,
    user,
    data,
    page,
    loading,
    setPage,
    handleGetData,
    handleAddData,
    handleUpdateData,
    handleDeleteData,
    handleLogin,
    handleLogout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export default AppContextProvider;
