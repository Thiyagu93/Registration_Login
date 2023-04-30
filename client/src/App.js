import "./App.css";

function App() {
  return (
    <div class=" container">
      <div class="registration mx-auto ">
        <h1 class="d-flex justify-content-center">Registration</h1>
        <label>UserName</label>
        <input class="form-control" type="text" placeholder="UserName.." />
        <label>Password</label>
        <input class="form-control" type="text" placeholder="Password.." />
        <br></br>
        <button class="btn btn-success mx-auto">SignUp</button>
      </div>
      <div class="login mx-auto">
        <h1 class="d-flex justify-content-center">LogIn</h1>
        <label>UserName</label>
        <input class="form-control" type="text" placeholder="UserName.." />
        <label>Password</label>
        <input class="form-control" type="text" placeholder="Password.." />
        <br></br>
        <button class="btn btn-success  mx-auto   ">LogIn</button>
      </div>
    </div>
  );
}

export default App;
