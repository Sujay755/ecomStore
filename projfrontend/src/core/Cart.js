import React, { useEffect, useState } from 'react'
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import Paymentb from './Paymentb';
// below line of code is for stripe payment
// import StripeCheckoutComponent from './StreipeCheckoutComponent';

const Cart = () => {

  const [products,setProducts] = useState([]);

  const [dummy, setDummy] = useState(""); // dummy state is used to remove some unwanted warnings, otherwise it don't have any use

  useEffect(()=>{
    setProducts(loadCart());
  },[dummy])

  const loadAllProducts = (products)=>{
    return(
      <div>
        <h2>This section is to load cart products</h2>
        {products.map((product, index)=>(
          <Card key={index} product={product} removeFromCartView={true} addToCartView={false} />
        ))}
      </div>
    )
  }
    
  return (
    <Base title='Cart Page' description='Ready to checkout'>
        <div className='row text-center'>
          <div className='col-4'>{products.length > 0 ? loadAllProducts(products) : (<h3>No products in cart</h3>) }</div>
          {/* Below line of code is for stripe payment */}
          {/* <div className='col-8'><StripeCheckoutComponent products={products}/></div> */}
          <div className='col-8'><Paymentb products={products}/></div>
        </div>
    </Base>
  )
}

export default Cart;
