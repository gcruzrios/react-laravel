


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
  
  
//const ingreso = { email: document.getElementById('email').value, password: document.getElementById('password') };
const ingreso = {email, password}
  
console.log(ingreso);

// var body = {
//   email: 'Flintstone@gmail.com',
//   password: '123456'
// }

// axios({
//   method: 'post',
//   url: '/api/login',
//   data: body
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });

//const response = await axios.post(`/api/login`,{data:ingreso},  {headers: {
const response = await axios.post(`/api/login`,{ email, password },  {headers: {
      
  //"Content-Type": "application/x-www-form-urlencoded",
   "Content-Type": "multipart/form-data",
}}, );

  const mensaje = response.data.message;

  console.log(mensaje);

  if (mensaje === "Login success") {
    const token = response.data.access_token;
    localStorage.setItem("Token", token);
    window.location.href = "/index";
  } 
  
  if (mensaje==="User not found") {
    Swal.fire({
      text: "Usuario o contraseña incorrectas..",
      icon: "error",
    });
  }
};


  return (
    <div>

<main className="form-signin">
  <form encType='multipart/form-data'  id="login-form">
    <img className="mb-4" src="/reshot-icon-logout-39XGS2UZLY.svg" alt="" width="72" height="57"/>
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating">
      <input type="email" className="form-control" id="floatingInput" 
      onChange={(e) => setEmail(e.target.value)}
      placeholder="name@example.com"
      name="email"/>

      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" 
       onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      name="password"/>
      <label for="floatingPassword">Password</label>
    </div>

    <div className="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> Remember me
      </label>
    </div>
    <button className="w-100 btn btn-lg btn-primary" 
    
    onClick={handleLogin}
    >Sign in
    </button>
    <p className="mt-5 mb-3 text-muted">&copy; 2017–{ year }</p>
  </form>
</main>

    </div>
  )
}

export default Login