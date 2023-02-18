import React,{useState} from "react";
import Base from '../core/Base'
import { NavLink, Navigate } from "react-router-dom";

import {signin, authenticate, isAuthenticated} from "../auth/helper"

const Signin = () => {

    const [values, setValues] = useState({
        email: "babai@gmail.com",
        password: "12345",
        error: "",
        loading: false,
        didRedirect: false
    })

    const {email,password,error,loading,didRedirect} = values;
    const {user} = isAuthenticated();

    const handleChange = (email) => (event) => {
        setValues({ ...values, error: false, [email]: event.target.value });
      };

      const onSubmit = event =>{
        event.preventDefault();
        signin({email,password})
        .then(data=>{
            if(data.errors){
                setValues({ ...values, error: data.errors, [email]: event.target.value });
            }
            else{
                authenticate(data, ()=>{
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                })
            }
        })
        .catch(err=>console.log('signin request failed'))
      }

      const performRedirect = ()=>{
        if(didRedirect){
            if(user && user.role === 1){
                return <Navigate to="/admin/dashboard" />
            }
            else{
                return <Navigate to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Navigate to="/" />
        }
      }

      const loadingMessage = () => {
        return (
          loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
          )
        );
      };
    
      const errorMessage = () => (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-start">
            <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>
          </div>
        </div>
      );
    

    const signInForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-start">
                    <form>
                        <div className="mb-3">
                            <label className="text-light">Email</label>
                            <input value={email} className="form-control" type='email' onChange={handleChange("email")}/>
                        </div>

                        <div className="mb-3">
                            <label className="text-light">Password</label>
                            <input value={password} className="form-control" type='Password' onChange={handleChange("password")}/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success w-100">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

  return (
    <Base title="Sign in page" description="A page for user to sign in">
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
    </Base>
  )
}

export default Signin;

