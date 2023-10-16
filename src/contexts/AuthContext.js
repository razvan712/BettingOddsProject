import React, { createContext, useState } from "react";
import { useCookies } from "react-cookie";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [username, setUsername] = useState("Mircea");
  
  const [role, setRole] = useState(null);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const [token, setToken] = useState(cookies.token ?? null);
  const [name, setName] = useState(localStorage.getItem("name") ?? '');



  const handleClose = () => {

    setShow(false);
    setUsername("");
    setPassword("");
    console.log(username,"close");
  }

  const handleCloseLogout = () => {
    setShowLogout(false);
 
  }

  const handleShow = () => setShow(true);

  const login = (jwtToken) => {
    setToken(jwtToken);
    console.log(jwtToken, "token");
  };

  const logout = () => {
    setShowLogout(false);
    setToken(null);
    setCookie("token", null, { path: "/" });
  
  };

  const isAuthenticated = () => {
    return token !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated,
        userID,
        setUserID,
        username,
        setUsername,
        name,
        setName,
      
        role,
        setRole,
        show,
        setShow,
        handleClose,
        handleShow,
        setPassword,
        password,
        userData,
        setUserData,
        showLogout,
        setShowLogout,
        setToken,
        handleCloseLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
