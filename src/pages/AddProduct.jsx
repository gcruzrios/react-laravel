import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddProduct = () => {
    const Token = localStorage.getItem("Token");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAdd = async (e) => {
        e.preventDefault();
    
        const new_product = { title, description  };
    
        console.log(new_product);
    
        const response = await axios.post(`/api/products`, new_product,{headers: {
            'Authorization': 'Bearer ' + Token
          }});
        const mensaje = response.data.message;
        console.log(mensaje);
    
        if (mensaje === null) {
          Swal.fire({
            text: "Error ..",
            icon: "error",
          });
        } else {
          Swal.fire({
            text: "Product added..",
            icon: "success",
          });
    
          window.location.href = "/index";
        }
      };
  return (
    <div>
      <h1>AddProduct</h1>
      <div className="form-group">
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Product
          </label>
          <input
            type="text"
            className="form-control"
            id="product"
            placeholder="Product"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            Description
          </label>
          <textarea
            class="form-control"
            id="edescription"
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
     
      <div className="form-group">
        <div className="col-sm-12">
          <button className="btn btn-success" onClick={handleAdd}>
            Add Product
          </button>{" "}
          <Link to="/index" className="btn btn-secondary">
            Return
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
