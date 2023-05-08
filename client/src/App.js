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

  const [loginStatus, setLoginstatus] = useState(false);

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
        console.log(response);
        if (!response.data.auth) {
          setLoginstatus(false);
        } else {
          console.log(response.data);
          setLoginstatus(true);
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginstatus(response.data.user[0].username);
      }
    });
  }, []);

  const userAuthendicated = () => {
    axios
      .get("http://localhost:3001/isUserAuth", {
        headers: {},
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div class=" container">
      <div class="registration mx-auto ">
        <h1 class="d-flex justify-content-center ">
          <u>Registration</u>
        </h1>
        <br></br>
        <div class="form-floating">
          <input
            type="username"
            class="form-control"
            id="floatingInputGrid"
            placeholder="UserName"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
          />
          <label htmlFor="floatingInputGrid">UserName</label>
        </div>
        <br></br>
        <div class="form-floating">
          <input
            type={regvisible ? "password" : "text"}
            class="form-control"
            id="floatingInputGrid"
            placeholder="PassWord"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
          <label htmlFor="floatingInputGrid">PassWord</label>

          <div class="eye1" onClick={() => setRegVisible(!regvisible)}>
            <i>{regvisible ? <AiFillEyeInvisible /> : <AiFillEye />}</i>
          </div>
        </div>
        <br></br>
        <button onClick={register} class="btn btn-success mx-auto">
          SignUp
        </button>
      </div>
      <div class="login mx-auto mt-2">
        <h1 class="d-flex justify-content-center">
          <u>LogIn</u>
        </h1>
        <div class="form-floating">
          <input
            type="email"
            class="form-control"
            id="floatingInputGrid"
            placeholder="name@example.com"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="floatingInputGrid">UserName</label>
        </div>
        <br></br>
        <div class="flex justify-between iten-center ">
          <div class="form-floating">
            <input
              type={visible ? "password" : "text"}
              class="form-control"
              id="floatingInputGrid"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="floatingInputGrid">PassWord</label>
          </div>

          <div class="eye" onClick={() => setVisible(!visible)}>
            <i>{visible ? <AiFillEyeInvisible /> : <AiFillEye />}</i>
          </div>
        </div>
        <br></br>
        <button onClick={login} class="btn btn-success  mx-auto">
          LogIn
        </button>
      </div>
      <br></br>
      <h1 class=" mx-auto d-flex justify-content-center  ">
        {loginStatus && (
          <button onClick={userAuthendicated} class="btn btn-primary">
            Check if Authendicated
          </button>
        )}
      </h1>
    </div>
  );
}

export default App;
