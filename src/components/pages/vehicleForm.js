import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { VehicleTypeContext } from '../../context/VehicleTypeContext';
import VehicleTable from './vehicleTable';

export default function VehicleForm() {
    const { vehicleTypes } = useContext(VehicleTypeContext)
    const navigate = useNavigate();

    const initialValues = {
        vehicleNumber: '',
        vehicleTypeId: ''
    };

    const vehicleValidationSchema = Yup.object({
        vehicleNumber: Yup.string()
            .required('Vehicle number is required'),
        vehicleTypeId: Yup.string()
            .required('Vehicle type is required')
    });

    return (
        <div>
            <h2>Add Vehicle</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={vehicleValidationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const response = await axios.post('http://localhost:3100/api/vehicles', values,{
                            headers : {
                                Authorization : localStorage.getItem('token')
                            }
                        });
                        console.log('Vehicle added successfully:', response.data);
                        navigate('/supplier-dashboard');
                    } catch (error) {
                        console.error('Error adding vehicle:', error);
                    }
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="vehicleType">Vehicle Type</label>
                            <Field as="select" name="vehicleTypeId">
                                <option value="">Select Vehicle Type</option>
                                {vehicleTypes.data.map((type) => (
                                    <option key={type._id} value={type._id}>{type.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="vehicleTypeId" component="div" />
                        </div>
                        <div>
                            <label htmlFor="vehicleNumber">Vehicle Number</label>
                            <Field type="text" name="vehicleNumber" />
                            <ErrorMessage name="vehicleNumber" component="div" />
                        </div>
                        <Button type="submit" disabled={isSubmitting}>Submit</Button>
                    </Form>
                )}
            </Formik>
            <VehicleTable />
        </div>
    );
}
