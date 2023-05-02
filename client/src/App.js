import React from "react";
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

  return (
    <div class=" container">
      <div class="registration mx-auto ">
        <h1 class="d-flex justify-content-center">Registration</h1>
        <label>UserName</label>
        <input
          class="form-control"
          type="text"
          placeholder="UserName.."
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          class="form-control"
          type="password"
          placeholder="Password.."
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <br></br>
        <button onClick={register} class="btn btn-success mx-auto">
          SignUp
        </button>
      </div>
      <div class="login mx-auto mt-2">
        <h1 class="d-flex justify-content-center">LogIn</h1>
        <label>UserName</label>
        <input
          class="form-control"
          type="text"
          placeholder="UserName.."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <div class="flex justify-between iten-center ">
          <label>Password</label>
          <input
            class="form-control "
            value={password}
            type={visible ? "password" : "text"}
            placeholder="Password.."
            id="inputGroupFile01"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div class="eye" onClick={() => setVisible(!visible)}>
            <span>{visible ? <AiFillEyeInvisible /> : <AiFillEye />}</span>
          </div>
        </div>
        <br></br>
        <button onClick={login} class="btn btn-success  mx-auto">
          LogIn
        </button>
      </div>
      <br></br>
      <h1 class=" mx-auto d-flex justify-content-center  ">{loginStatus}</h1>
    </div>
  );
}

export default App;
