import React, { useEffect } from 'react'
import { Formik,Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import "./SignUp.css"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { SignUpUser } from '../auth/AuthSlice';
import { clearState } from '../auth/AuthSlice';

export default function SignUp() {
     const [pic, setPic] = useState("");

    const dispatch= useDispatch();
    const data = useSelector((state) => state.user);
    let { error, message, loading } = data;

    useEffect(() => {
      if (error) {
        toast.error(error, { position: toast.POSITION.TOP_CENTER });
      }
      if (message) {
        toast.success(message, { position: toast.POSITION.TOP_CENTER });
        setTimeout(() => {
         dispatch(clearState());
        }, 500);
      }
    }, [error, message]);

  const initialState = {
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhone: "",
    userCity: "",
    userState: "",
  };

  const validationSchema = yup.object().shape({
    userName: yup.string().required("Please enter your name"),
    userEmail: yup.string().required().email("Please enter your email"),
    userPassword: yup
      .string()
      .required("Please enter your password")
      .min(5, "password must have at least 5 characters"),
    userPhone: yup.string().required("Please enter your phone number"),
    userCity: yup.string().required("Please enter your city"),
    userState: yup.string().required("Please enter your state"),
  });

  function handleSubmit(values) {
    console.log("Values",values);
    let obj = {
      profilePic: pic,
      ...values,
    };
     dispatch(SignUpUser(obj));
  }

  function picselect(e) {
    setPic(e.target.files[0]);
  }
  return (
    <div >
    <ToastContainer/>
    <div className='signup-container1'>
      <div className="signup-container">
      <h2 className="signup-h2">Sign-up</h2>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="signup-form">
            <Field
              className="signup-input"
              type="text"
              name="userName"
              placeholder="&#128512; Full Name"
            />
            <br />
            <span className="danger-message">
              <ErrorMessage name="userName"></ErrorMessage>
            </span>
            <br />
            <Field
              className="signup-input"
              type="text"
              name="userEmail"
              placeholder="&#x2709; Email ID"
              required
            />
            <br />
            <span className="danger-message">
              <ErrorMessage name="userEmail"></ErrorMessage>
            </span>
            <br />
            <Field
              className="signup-input"
              type="password"
              name="userPassword"
              placeholder="&#128272; Password"
              required
            />
            <br />
            <span className="danger-message">
              <ErrorMessage name="userPassword"></ErrorMessage>
            </span>
            <br />
            <Field
              className="signup-input"
              type="Number"
              name="userPhone"
              placeholder="&#128222; Phone Number"
              required
            />
            <br />
            <span className="danger-message">
              <ErrorMessage name="userPhone"></ErrorMessage>
            </span>
            <br />
            <Field
              className="signup-input"
              type="text"
              name="userCity"
              placeholder="&#10148; City"
              required
            />
            <br />
            <span className="danger-message">
              <ErrorMessage name="userCity"></ErrorMessage>
            </span>
            <br />
            <Field
              className="signup-input"
              type="text"
              name="userState"
              placeholder=" &#8982; State"
              required
            />
            <br />
            <span className="danger-message">
              <ErrorMessage name="userState"></ErrorMessage>
            </span>
            <br />

            <input type="file" onChange={picselect}></input>
            <br />
            <button className="signup-btn" type="submit">
              Sign Up
            </button>
          </Form>
        </Formik>
        <hr />
        
        <p className="signup-p1">I already have an account <Link to="/" className='Login-btnn'>Login</Link> </p>
      </div>
    </div>
    </div>
  )
}