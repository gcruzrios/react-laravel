


import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


const Login = () => {

const d = new Date();
let year = d.getFullYear();


const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  let bodyFormData = new FormData();
  
  //bodyFormData.setEmail(email);
  //bodyFormData.setPassword(password);

  bodyFormData.set('email',email);
  bodyFormData.set('password', password);

  const ingreso = { email:email, password:password };
  console.log(ingreso);
  const response = await axios.post(`/api/login`,{data:ingreso},  {headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    // "Content-Type": "multipart/form-data",
}}, );

  const mensaje = response;

  console.log(mensaje);

  if (mensaje === "Login success") {
    const token = response.token;
    localStorage.setItem("Token", token);
    window.location.href = "/index";
  } else {
    Swal.fire({
      text: "Usuario o contraseña incorrectas..",
      icon: "error",
    });
  }
};


  return (
    <div>

<main class="form-signin">
  <form>
    <img class="mb-4" src="/reshot-icon-logout-39XGS2UZLY.svg" alt="" width="72" height="57"/>
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" 
      onChange={(e) => setEmail(e.target.value)}
      placeholder="name@example.com"/>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" 
       onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"/>
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> Remember me
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" 
    
    onClick={handleLogin}
    >Sign in
    </button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–{ year }</p>
  </form>
</main>

    </div>
  )
}

export default Login