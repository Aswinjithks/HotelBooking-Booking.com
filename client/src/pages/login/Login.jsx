import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentilas] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate()

  const { dispatch, loading, error } = useContext(AuthContext);



//   const handleChange = (e) => {
//     setCredentilas((...prev) => ({ prev, [e.target.id]: e.target.value }));
//   };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCESS", payload: response.data });
      navigate('/')
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <div className="container">
        <input
          placeholder="Enter your username"
          id="username"
          onChange={(e)=>setCredentilas({...credentials,username:e.target.value})}
          type="text"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={(e)=>setCredentilas({...credentials,password:e.target.value})}
        />
        <button disabled={loading} className="login-button" onClick={handleClick}>
          login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
