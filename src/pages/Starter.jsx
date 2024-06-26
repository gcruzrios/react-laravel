import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "./starter-template.css";

const Starter = () => {
  const [products, setProducts] = useState([]);
  const Token = localStorage.getItem("Token");
  const logout = () => {
    console.log("Estoy en Logout");
    localStorage.clear();
    window.location.href = "/";
  };

  const d = new Date();
  let year = d.getFullYear();
  
  const eliminar_completo = async (id) => {
    const response = await axios.delete(`/api/products/${id}`,{headers: {
      'Authorization': 'Bearer ' + Token
    }});
    
    console.log(response)
    peticionGet();



  }  
  const delete_record = async (id) => {


    Swal.fire({
      title: 'Are you sure?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        eliminar_completo(id);
        Swal.fire('Record Deleted!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Nothing happened', '', 'info')
      }
    })
    
   
  };

 


  const peticionGet = async () => {
    console.log("en petición get")         
    await axios.get("/api/products").then((response) => {
      //
     // console.log(response.data.data);
      setProducts(response.data.data);
      console.log(products);
    });


  };

  useEffect(() => {
    
    peticionGet();
  }, []);


  return (
    <div>
      <div className="col-lg-12 mx-auto p-3 py-md-5">
        <header className="d-flex justify-content-between pb-3 mb-5 border-bottom">
          <a
            href="/index"
            className="d-flex align-items-left text-dark text-decoration-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="32"
              className="me-2"
              viewBox="0 0 118 94"
              role="img"
            >
              <title>Bootstrap</title>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="fs-4">Starter template</span>
          </a>
          <button
            className="btn btn-primary btn-lg mb-5 mt-5 px-3 "
            onClick={logout}
          >
            Logout
          </button>
        </header>

        <main>
          <h1 className="text-left">Get started with Bootstrap</h1>
            <Link to="/addproduct" className="btn btn-primary float-end">
                  Add Product
            </Link>
            {/* <button className="btn btn-primary float-end">Add New</button> */}
            <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
 
           {products.map((record) => ( 
              <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.title}</td>
                <td>{record.description}</td>
                <td>
                    <Link to={`/editproduct/${record.id}`} className="btn btn-primary">Edit</Link>
                    <button className="btn btn-danger" onClick={()=>delete_record(record.id)}>Delete</button>
                </td>
              </tr>
               ))}     
              
            </tbody>
          </table>

          <div className="mb-5 text-right">
            <a href="" className="btn btn-primary btn-lg px-4 ">
              Download examples
            </a>
          </div>

          <div className="row g-5"></div>
        </main>
        <footer className="pt-5 my-5 text-muted border-top">
          Created by the Bootstrap team &middot; &copy; {year}
        </footer>
      </div>
    </div>
  );
};

export default Starter;
