import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginstatus] = useState("");

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
        <label>Password</label>
        <input
          className="form-control"
          type="text"
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
      <div className="login mx-auto">
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
        <label>Password</label>
        <input
          className="form-control"
          type="text"
          placeholder="Password.."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br></br>
        <button onClick={login} className="btn btn-success  mx-auto   ">
          LogIn
        </button>
      </div>
      <br></br>
      <h1 className=" mx-auto d-flex justify-content-center  " >{loginStatus}</h1>
    </div>
  );
}

export default App;
