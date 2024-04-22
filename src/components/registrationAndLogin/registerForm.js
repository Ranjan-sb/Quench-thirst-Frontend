import React, { useState } from 'react';
import '../../style.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        mobileNumber: '',
        role: '',
        building: '',
        locality: '',
        city: '',
        state: '',
        pinCode: '',
        country: ''
    })

    const navigate = useNavigate()

    //const [errors, setErrors] = useState({})

    // const validateForm = (data) => {
    //     const errors = {};
    //     if (!data.username.trim()) {
    //         errors.username = 'Username is required';
    //     }
    //     if (!data.email.trim()) {
    //         errors.email = 'Email is required';
    //     } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    //         errors.email = 'Email is invalid';
    //     }
    //     if (!data.password.trim()) {
    //         errors.password = 'Password is required';
    //     }
    //     if (!data.mobileNumber.trim()) {
    //         errors.mobileNumber = 'Mobile Number is required';
    //     }
    //     if (!data.role.trim()) {
    //         errors.role = 'Role is required';
    //     }
    //     if (data.role === 'customer') {
    //         if (!data.building.trim()) {
    //             errors.building = 'Building is required';
    //         }
    //         if (!data.locality.trim()) {
    //             errors.locality = 'Locality is required';
    //         }
    //         if (!data.city.trim()) {
    //             errors.city = 'City is required';
    //         }
    //         if (!data.state.trim()) {
    //             errors.state = 'State is required';
    //         }
    //         if (!data.pinCode.trim()) {
    //             errors.pinCode = 'Pin Code is required';
    //         }
    //         if (!data.country.trim()) {
    //             errors.country = 'Country is required';
    //         }
    //     }
    //     return errors;
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        //setErrors({ ...errors, [name]: '' }); // Clear any previous errors when input changes
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const validationErrors = validateForm(formData)
        // if (Object.keys(validationErrors).length > 0) {
        //     setErrors(validationErrors);
        //     return;
        // }
        try {
            const response = await axios.post('http://localhost:3100/api/users/register', formData);
            console.log(response.data);
            navigate('/emailVerification')
            //setErrors("")
            // Handle success, e.g., redirect to login page

        } catch (error) {
            console.error(error);
            //setErrors(error.response.data.errors)
        }
    };

    return (
        <div>
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>

            <label>Role : </label>
                <label htmlFor="customer">
                    <input 
                        type="radio" 
                        id="customer" 
                        name="role" 
                        value="customer" 
                        checked={formData.role === 'customer'} 
                        onChange={handleChange} 
                    />
                    Customer
                </label>
                <label htmlFor="supplier">
                    <input 
                        type="radio" 
                        id="supplier" 
                        name="role" 
                        value="supplier" 
                        checked={formData.role === 'supplier'} 
                        onChange={handleChange} 
                    />
                    Supplier
                </label><br />
                {/* {errors.role && <div className="error">{errors.role}</div>} */}

                <label htmlFor="username">Username:</label><br />
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} required 
                /><br />
                {/* {errors.username && <div className="error-message">{errors.username}</div>}<br /> */}

                <label htmlFor="email">Email:</label><br />
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} required 
                /><br />
                {/* {errors.email && <div className="error-message">{errors.email}</div>}<br /> */}

                <label htmlFor="password">Password:</label><br />
                <input 
                    type="password" 
                    id="password" name="password" 
                    value={formData.password} 
                    onChange={handleChange} required 
                /><br />
                {/* {errors.password && <div className="error-message">{errors.password}</div>}<br /> */}

                <label htmlFor="mobileNumber">Mobile Number:</label><br />
                <input 
                    type="text" 
                    id="mobileNumber" 
                    name="mobileNumber" 
                    value={formData.mobileNumber} 
                    onChange={handleChange} 
                /><br />
                {/* {errors.mobileNumber && <div className="error-message">{errors.mobileNumber}</div>}<br />
                 */}
                {formData.role === 'customer' && (
                    <div>
                        <label htmlFor="building">Building:</label><br />
                        <input 
                            type="text" 
                            id="building" 
                            name="building" 
                            value={formData.building} 
                            onChange={handleChange} 
                        /><br />
                        {/* {errors.building && <div className="error-message">{errors.building}</div>}<br /> */}

                        <label htmlFor="locality">Locality:</label><br />
                        <input 
                            type="text" 
                            id="locality" 
                            name="locality" 
                            value={formData.locality} 
                            onChange={handleChange} 
                        /><br />
                        {/* {errors.locality && <div className="error-message">{errors.locality}</div>}<br /> */}

                        <label htmlFor="city">City:</label><br />
                        <input  
                            type="text" 
                            id="city" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleChange} 
                        /><br />
                        {/* {errors.city && <div className="error-message">{errors.city}</div>}<br /> */}

                        <label htmlFor="state">State:</label><br />
                        <input 
                            type="text" 
                            id="state" 
                            name="state" 
                            value={formData.state} 
                            onChange={handleChange} 
                        /><br />
                        {/* {errors.state && <div className="error-message">{errors.state}</div>}<br /> */}

                        <label htmlFor="pinCode">Pin Code:</label><br />
                        <input 
                            type="text" 
                            id="pinCode" 
                            name="pinCode" 
                            value={formData.pinCode} 
                            onChange={handleChange} 
                        /><br />
                        {/* {errors.pinCode && <div className="error-message">{errors.pinCode}</div>}<br /> */}

                        <label htmlFor="country">Country:</label><br />
                        <input 
                            type="text" 
                            id="country" 
                            name="country" 
                            value={formData.country} 
                            onChange={handleChange} 
                        /><br /><br />
                        {/* {errors.country && <div className="error-message">{errors.country}</div>}<br /> */}
                    </div>
                )}

                <button type="submit">Register User</button>
            </form>
        </div>
    );
};

export default RegisterForm;
