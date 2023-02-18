import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getMeToken, processThePayment } from "./helper/paymentbhelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({products}) => {

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((response) => {
    //   console.log("INFORMATION",response);
      if (response.error) {
        setInfo({ ...info, error: response.error });
      } else {
        const clientToken = response.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const shhowbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success w-100" onClick={onPurchase}>Buy</button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = ()=>{
    setInfo({loading: true})
    let nonce;
    let getNonce = info.instance
    .requestPaymentMethod()
    .then(data=>{
      nonce = data.nonce
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      }
      processThePayment(userId, token, paymentData)
      .then(response=>{
        setInfo({...info, success: response.success, loading: false})
        console.log('PAYMENT SUCCESS');
        console.log(response);
        console.log(products);
        console.log(userId);
        const orderData = {
          products: products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount
        }
        createOrder(userId, token, orderData);
        //A bug is there,please fix it
        cartEmpty(()=>{
          console.log('Did we got a crash');
        })
        // window.location.reload(true)
      })
      .catch(error=>{
        setInfo({loading: false, success: false});
        console.log('PAYMENT FAILED');
      })
    })
  }

  const getAmount = ()=>{
    let amount = 0;
    products.map(p=>{
      amount += p.price;
    })
    return amount;
  }

  return (
    <div>
      <h3>Your total bill is ${getAmount()}</h3>
      {shhowbtdropIn()}
    </div>
  );
};

export default Paymentb;
