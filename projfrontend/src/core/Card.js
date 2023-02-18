import React,{useState,useEffect} from "react";
import Imagehelper from "./helper/Imagehelper";
import { Navigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({ product, addToCartView = true, removeFromCartView = false }) => {
    const [redirect, setRedirect] = useState(false);

    const cardTitle = product ? product.name : "A Photo from pexel"
    const cardDescription = product ? product.description : "Default description"
    const cardPrice = product ? product.price : "DEFAULT"

    const addToCart = ()=>{
      addItemToCart(product, ()=> setRedirect(true))
    }

    const getRedirect = (redirect)=>{
      if(redirect){
        return <Navigate to="/cart" />
      }
    }

  const showAddToCart = (addToCartView) => {
    return (
      addToCartView && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2 w-100"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCartView) => {
    return (
      removeFromCartView && (
        <button
          onClick={()=>{
            removeItemFromCart(product._id, ()=>window.location.reload(true))
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2 w-100"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <Imagehelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">${cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCartView)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCartView)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
