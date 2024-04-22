import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../../style.css'
import * as Yup from 'yup';
import axios from 'axios';

export default function VehicleTypeForm(){

    const initialValues = {
        name: '',
        quantity: '',
        prices: [{ purpose: '', price: '' }]
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        quantity: Yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
        prices: Yup.array().of(
            Yup.object().shape({
                purpose: Yup.string().required('Purpose is required'),
                price: Yup.number().required('Price is required').positive('Price must be a positive number')
            })
        )
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:3100/api/vehicleTypes', values);
            console.log(response.data);
            // Handle success
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };
    return (
        <div>
            <h1>Add Vehicle Type</h1>
            <Formik 
                initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={handleSubmit}>
                {({ values }) => (
                    <Form>
                        <div>
                            <label htmlFor="name">Name:</label><br />
                            <Field 
                                type="text" 
                                id="name" 
                                name="name" 
                            />
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </div>

                        <div>
                            <label htmlFor="quantity">Quantity:</label><br />
                            <Field 
                                type="number" 
                                id="quantity" 
                                name="quantity" 
                            />
                            <ErrorMessage name="quantity" component="div" className="error-message" />
                        </div>

                        <div>
                            {/* <label>Prices:</label><br /> */}
                            {values.prices.map((price, index) => (
                                <div key={index}>
                                    <label htmlFor={`prices.${index}.purpose`}>Purpose:</label><br />
                                    <Field type="text" id={`prices.${index}.purpose`} name={`prices.${index}.purpose`} />
                                    <ErrorMessage name={`prices.${index}.purpose`} component="div" className="error-message" /><br />
                                    <label htmlFor={`prices.${index}.price`}>Price:</label><br />
                                    <Field type="number" id={`prices.${index}.price`} name={`prices.${index}.price`} />
                                    <ErrorMessage name={`prices.${index}.price`} component="div" className="error-message" />
                                </div>
                            ))}
                            <button type="button" onClick={() => values.prices.push({ purpose: '', price: '' })}>Add Price</button>
                        </div>

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
