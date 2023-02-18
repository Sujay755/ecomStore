import React,{useState, useEffect} from 'react'
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout'
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';


const StripeCheckoutComponent = ({products}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalPrice = ()=>{
        let amount = 0
        products.map(p=>{
            amount += p.price
    })
        return amount

    }

    const makePayment = (token)=>{
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
        .then(response=>{
            console.log(response);
            //call further methods
        })
        .catch(error=>console.log(error))
    }

    const showStripeButton = ()=>{
        return isAuthenticated() ? (
            <StripeCheckout
            stripeKey="pk_test_51MZVo2SANlGHyqLOErk5ND4gIpkVK8i6NbXWsF7p8HKggtEeGTFwAvZGsR3iDX00SVMZQ9TVJsctCUgQH7oELGW700YmvOUxy0"
            token={makePayment}
            amount={getFinalPrice() * 100}
            name="Buy Tshirts"
            shippingAddress
            billingAddress>
                <button className='btn btn-success'>Pay with stripe</button>
            </StripeCheckout>
        ) : (
            <Link to="/signin">
                <button className='btn btn-warning'>Signin</button>
            </Link>
        )
    }


  return (
    <div>
        <h3>Stripe checkout {getFinalPrice()}</h3>
        {showStripeButton()}
    </div>
  )
}

export default StripeCheckoutComponent;