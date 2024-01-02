import React, { useEffect } from 'react'
import { Formik,Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { SignInUser, clearState} from '../auth/AuthSlice';
import "./Login.css"
export default function Login() {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const data= useSelector((state)=> state.user);
  let { error, message, loading } = data;
 
  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
        navigate("/Quiz/")
      }, 1000);
    }
  }, [error, message]);

  const initialValues={
    userEmail: "",
    userPassword: "",
  };
  const validationSchema= yup.object().shape({
    userEmail:yup.string().required("Please enter your email"),
    userPassword:yup.string().required("Please enter your Password"),
  })

  
  const handleSubmit= async (values) =>{
    console.log("values",values);
    const result= await dispatch(SignInUser(values));
  }
  return (
    <>
     <ToastContainer/>
    <div className='Login-main-page'>
     <div className='Login-page'>
      <h1 className='login-tag'>Login</h1>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
       >
        <Form>
          <Field 
            className="input-box1"
            type="text"
            name="userEmail"
            placeholder="&#x2709; Enter Email Address"
          />
          <br/>
          <ErrorMessage name='userEmail'></ErrorMessage>
           <br/>
           <Field
            className='input-box1'
            type="password"
            name="userPassword"
            placeholder="&#x2709; Enter Email Password"
           />
           <br/>
           <ErrorMessage name='userPassword'></ErrorMessage>
           <br/>
           <p>
           <div className='forget-paswordlogin-bt'>
           <button type='submit' className='login-bt'>Login</button>
           </div>
           <div className='forget-pasword'>
           {/* <Link to='ForgetPassword' className='forget-pasword1'>Forget password?</Link> */}
           </div>
            <br/>
           </p>
        </Form>
      </Formik>
      
      <hr id='h-r'/>
      <p> I don't have an account on Quiz & App </p>
      <Link to='SignUp' className='r-now'>Register now</Link>

     </div>
    </div>
    </>
  )
}
