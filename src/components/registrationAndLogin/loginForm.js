import { useState } from "react";
import * as Yup from 'yup';
import axios from 'axios'
import '../../style.css'
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, FormGroup, FormLabel, FormControl,Alert } from 'react-bootstrap';
import { startGetRequests,startGetMyRequests } from "../../actions/request-action";
import { startGetCustomerOrders,startGetSupplierOrders } from "../../actions/orders-action";
import { useDispatch } from "react-redux";



export default function LoginForm(props) {
    //const [formErrors, setFormErrors] = useState([])
    const [serverErrors, setServerErrors] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { handleLogin } = useAuth()
    const initialValues = {
        email: '',
        password: '',
    };

    // Define the validation schema using Yup
    const loginValidationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:3100/api/users/login', values)
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            const userResponse = await axios.get('http://localhost:3100/api/users/account', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            if(userResponse.data.role === 'customer'){
                dispatch(startGetRequests());
                dispatch(startGetCustomerOrders());
                //navigate('/customer-dashboard')
            }
            if(userResponse.data.role === 'supplier'){
                dispatch(startGetMyRequests());
                dispatch(startGetSupplierOrders());
                //navigate('/supplier-dashboard')
            }
            props.setLogin()
            handleLogin(userResponse.data)
            navigate('/login-success')
            setServerErrors("")

        } catch (error) {
            console.log(error)
            setServerErrors(Array.isArray(error.response?.data?.error) ? error.response.data.error : [error.response.data.error]);
            //setServerErrors(error.response.data.error)
            //alert(error)
        }
    }

    return (
        <div className="loginForm">
            <h1>Login</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={loginValidationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    {serverErrors.length > 0 && (
                        <Alert variant="danger">
                            {serverErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </Alert>
                    )}
                    <FormGroup controlId="email">
                        <FormLabel>Email : </FormLabel>
                        <Field
                            type="text"
                            name="email"
                            placeholder="Enter Email Id"
                            as={FormControl}
                        />
                        <ErrorMessage name="email" component="div" className="error-message" />
                    </FormGroup><br />

                    <FormGroup controlId="password">
                        <FormLabel>Password : </FormLabel>
                        <Field
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            as={FormControl}
                        />
                        <ErrorMessage name="password" component="div" className="error-message" />
                    </FormGroup><br />

                    <Button type="submit" >Login</Button><br /><br />
                    <Link to='/forgot-password'>Forgot Password?</Link><br /><br />
                    <Link to='/register'>New User? Register here</Link>
                </Form>
            </Formik>
        </div>
    )

}