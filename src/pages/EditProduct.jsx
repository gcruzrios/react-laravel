import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


const EditProduct = () => {

    const Token = localStorage.getItem("Token");


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { id } = useParams();

    const GetProduct = async () => {
      const response = await axios.get(`/api/product/${id}`);
      const mensaje = response.data;
  console.log(mensaje)
      setTitle(mensaje.data.title);
      setDescription(mensaje.data.description);
    
    };

    useEffect(() => {
      GetProduct();
     
    }, []);


    const handleEdit = async (e) => {
      e.preventDefault();
  
      //    const token = data.Token;
      //    localStorage.setItem("Token", token);
  
      const product = { title, description };
      console.log(product);
      const response = await axios.put(
        `/api/products/${id}`, product,{headers: {
          'Authorization': 'Bearer ' + Token
        }}
      );
      const respuesta = response.data;
      console.log(respuesta);
  
      if (respuesta === null) {
        Swal.fire({
          text: "Error on update..",
          icon: "error",
        });
      } else {
        Swal.fire({
          text: "Update Success ..",
          icon: "success",
        });
  
        window.location.href = "/index";
      }
    };

  return (
    <div>
 <h1>Edit Product</h1>
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
            value={title}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
     
      <div className="form-group">
        <div className="col-sm-12">
          <button className="btn btn-success" onClick={handleEdit}>
            Edit Product
          </button>{" "}
          <Link to="/index" className="btn btn-secondary">
            Return
          </Link>
        </div>
      </div>

    </div>




  )
}

export default EditProduct