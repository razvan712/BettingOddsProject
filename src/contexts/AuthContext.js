import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [username, setUsername] = useState("Mircea");
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [role, setRole] = useState(null);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

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
        firstname,
        setFirstname,
        lastname,
        setLastname,
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
