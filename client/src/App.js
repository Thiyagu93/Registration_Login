import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./App.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginstatus] = useState("");

  const [visible, setVisible] = useState(true);
  const [regvisible, setRegVisible] = useState(true);

  axios.defaults.withCredentials = true;

  const register = () => {
    axios
      .post("http://localhost:3001/register", {
        username: usernameReg,
        password: passwordReg,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginstatus(response.data.message);
        } else {
          setLoginstatus(response.data[0].username);
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if( response.data.loggedIn === true){
        setLoginstatus(response.data.user[0].username)
      }
    });
  }, []);

  return (
    <div className=" container">
      <div className="registration mx-auto ">
        <h1 className="d-flex justify-content-center">Registration</h1>
        <label>UserName</label>
        <input
          className="form-control"
          type="text"
          placeholder="UserName.."
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <div>
          <label>Password</label>
          <input
            className="form-control"
            value={passwordReg}
            type={regvisible ? "password" : "text"}
            placeholder="Password.."
            id="inputGroupFile02"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
          <div className="eye1" onClick={() => setRegVisible(!regvisible)}>
            <i>{regvisible ? <AiFillEyeInvisible /> : <AiFillEye />}</i>
          </div>
        </div>
        <br></br>
        <button onClick={register} className="btn btn-success mx-auto">
          SignUp
        </button>
      </div>
      <div className="login mx-auto mt-2">
        <h1 className="d-flex justify-content-center">LogIn</h1>
        <label>UserName</label>
        <input
          className="form-control"
          type="text"
          placeholder="UserName.."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <div className="flex justify-between iten-center ">
          <label>Password</label>
          <input
            className="form-control "
            value={password}
            type={visible ? "password" : "text"}
            placeholder="Password.."
            id="inputGroupFile01"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className="eye" onClick={() => setVisible(!visible)}>
            <i>{visible ? <AiFillEyeInvisible /> : <AiFillEye />}</i>
          </div>
        </div>
        <br></br>
        <button onClick={login} className="btn btn-success  mx-auto">
          LogIn
        </button>
      </div>
      <br></br>
      <h1 className=" mx-auto d-flex justify-content-center  ">
        {loginStatus}
      </h1>
    </div>
  );
}

export default App;
