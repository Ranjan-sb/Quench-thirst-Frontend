import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateRequest } from '../../actions/request-action';
import { VehicleTypeContext } from '../../context/VehicleTypeContext';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import '../../requestForm.css';

export default function RequestForm() {
    const { vehicleTypes } = useContext(VehicleTypeContext);
    const serverErrors = useSelector((state) => state.requests.serverErrors);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formErrors, setFormErrors] = useState({})

    const errors = {};

    const validate = () => {
        if (!formData.vehicleTypeId.trim()) {
            errors.vehicleTypeId = 'Vehicle type is required';
        }
        if (!formData.orderType.trim()) {
            errors.orderType = 'Order type is required';
        }
        if (!formData.quantity) {
            errors.quantity = 'Quantity is required';
        }
        if (!formData.purpose.trim()) {
            errors.purpose = 'Purpose is required';
        }
    }

    // State variables to manage form data and submission status
    const [formData, setFormData] = useState({
        vehicleTypeId: '',
        customerAddress: '',
        orderType: 'immediate',
        quantity: 0,
        orderDate: new Date().toISOString().split('T')[0],
        purpose: ''
    });
    const [submitted, setSubmitted] = useState(false);
    validate()
    // Handler for input changes
    const handleChange = (e) => {
        // const { name, value } = e.target;
        // setFormData({ ...formData, [name]: value });

        const { name, value } = e.target;

        // If the field being changed is orderType
        if (name === 'orderType') {
            // If orderType is advance, set orderDate to the next day
            if (value === 'advance') {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const nextDay = tomorrow.toISOString().split('T')[0];
                setFormData({ ...formData, orderType: value, orderDate: nextDay });
            } else {
                // If orderType is immediate, set orderDate to today
                setFormData({ ...formData, orderType: value, orderDate: new Date().toISOString().split('T')[0] });
            }
        } else {
            // For other fields, update form data as usual
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mark the form as submitted
        setSubmitted(true);

        const resetForm = () => {
            // Reset form data after successful submission
            setFormData({
                vehicleTypeId: '',
                customerAddress: '',
                orderType: 'immediate',
                quantity: 0,
                orderDate: new Date().toISOString().split('T')[0],
                purpose: ''
            });
        }

        // If there are errors, display them and prevent form submission
        if (Object.keys(errors).length === 0) {
            try {
                // Dispatch action to create request
                dispatch(startCreateRequest(formData, resetForm))

                // Show success message
                sweetAlertFunc();

                // Navigate to dashboard
                navigate("/customer-requests");

            } catch (error) {
                console.log(error)
            }
        } else {
            setFormErrors(errors)
            alert('Please fix the following errors:\n' + Object.values(errors).join('\n'));
            return
        }
    };

    const sweetAlertFunc = () => {
        Swal.fire({
            title: "Request",
            text: "Request Added Successful",
            icon: "success",
            confirmButtonText: "OK"
        });
    };

    return (
        <>
            <div className='offset-5'>
                <h5><b>REQUEST FORM</b></h5>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='requestForm'>
                    <label htmlFor="vehicleTypeId">Vehicle Type Name : </label>{" "}
                    <select
                        value={formData.vehicleTypeId}
                        onChange={handleChange}
                        name='vehicleTypeId'
                        id='vehicleTypeId'
                    >
                        <option value=''>Select VehicleType</option>
                        {vehicleTypes.data.map((ele) => {
                            return (
                                <option
                                    key={ele._id}
                                    value={ele._id}>{ele.name}</option>
                            )
                        })}
                    </select>
                    {submitted && formErrors.vehicleTypeId && <div style={{ color: 'red' }}>Vehicle type is required</div>}

                    <div className='radio-group'>
                        <label>Order Type : </label>{" "}
                        <label>
                            <input
                                type="radio"
                                name="orderType"
                                value="immediate"
                                checked={formData.orderType === 'immediate'}
                                onChange={handleChange}
                            />
                            Immediate
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="orderType"
                                value="advance"
                                checked={formData.orderType === 'advance'}
                                onChange={handleChange}
                            />
                            Advance
                        </label>
                    </div>
                    {submitted && formErrors.orderType && <div style={{ color: 'red' }}>Order type is required</div>}

                    <div>
                        <label htmlFor="quantity">Quantity : </label>{" "}
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min={1}
                            max={2}
                        />
                    </div>
                    {submitted && formErrors.quantity && <div style={{ color: 'red' }}>Quantity is required</div>}

                    {formData.orderType === 'immediate' ? (
                        <div>
                            <label>Order Date (Immediate) : </label>{" "}
                            <input
                                type="text"
                                value={formData.orderDate}
                                disabled
                            />
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="orderDate">Order Date (Advance) : </label>{" "}
                            <input
                                type="date"
                                id="orderDate"
                                name="orderDate"
                                value={formData.orderDate}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <label htmlFor="purpose">Purpose : </label>{" "}
                    <select
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                    >
                        <option value="">Select Purpose</option>
                        <option value="Domestic">Domestic</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Construction">Construction</option>
                        <option value="Priority">Priority</option>
                    </select><br />
                    {submitted && formErrors.purpose && <div style={{ color: 'red' }}>Purpose is required</div>}

                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );
}
