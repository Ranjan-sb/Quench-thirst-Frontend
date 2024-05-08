// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Button } from 'react-bootstrap';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { VehicleTypeContext } from '../../context/VehicleTypeContext';
// import Swal from "sweetalert2"

// export default function VehicleForm() {
//     const { vehicleTypes } = useContext(VehicleTypeContext)
//     const navigate = useNavigate();

//     const sweetAlertFunc = () => {
//         Swal.fire({
//             title: "Vehicle Data",
//             text: "Vehicle Data Added Successfully",
//             icon: "success",
//             confirmButtonText: "OK"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 navigate("/supplier-dashboard")
//             }
//         })
//     }


//     const initialValues = {
//         vehicleNumber: '',
//         vehicleTypeId: ''
//     };

//     const vehicleValidationSchema = Yup.object({
//         vehicleNumber: Yup.string()
//             .required('Vehicle number is required'),
//         vehicleTypeId: Yup.string()
//             .required('Vehicle type is required')
//     });

//     return (
//         <div>
//             <h2>Add Vehicle</h2>
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={vehicleValidationSchema}
//                 onSubmit={async (values, { setSubmitting }) => {
//                     try {
//                         const response = await axios.post('http://localhost:3100/api/vehicles', values,{
//                             headers : {
//                                 Authorization : localStorage.getItem('token')
//                             }
//                         });
//                         console.log('Vehicle added successfully:', response.data);
//                         sweetAlertFunc()
//                     } catch (error) {
//                         console.error('Error adding vehicle:', error);
//                     }
//                     setSubmitting(false);
//                 }}
//             >
//                 {({ isSubmitting }) => (
//                     <Form>
//                         <div>
//                             <label htmlFor="vehicleType">Vehicle Type</label>
//                             <Field as="select" name="vehicleTypeId">
//                                 <option value="">Select Vehicle Type</option>
//                                 {vehicleTypes.data.map((type) => (
//                                     <option key={type._id} value={type._id}>{type.name}</option>
//                                 ))}
//                             </Field>
//                             <ErrorMessage name="vehicleTypeId" component="div" />
//                         </div>
//                         <div>
//                             <label htmlFor="vehicleNumber">Vehicle Number</label>
//                             <Field type="text" name="vehicleNumber" />
//                             <ErrorMessage name="vehicleNumber" component="div" />
//                         </div>
//                         <Button type="submit" disabled={isSubmitting}>Submit</Button>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// }

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { VehicleTypeContext } from '../../context/VehicleTypeContext';
import Swal from "sweetalert2";
import '../../vehicleForm.css'; // Import the CSS file for styling

export default function VehicleForm() {
    const { vehicleTypes } = useContext(VehicleTypeContext)
    const navigate = useNavigate();

    const sweetAlertFunc = () => {
        Swal.fire({
            title: "Vehicle Data",
            text: "Vehicle Data Added Successfully",
            icon: "success",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/supplier-dashboard")
            }
        })
    }

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
        <div className="vehicle-form-container">
            <h2>Add Vehicle</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={vehicleValidationSchema}
                onSubmit={async (values, { setSubmitting,resetForm }) => {
                    try {
                        const response = await axios.post('http://localhost:3100/api/vehicles', values,{
                            headers : {
                                Authorization : localStorage.getItem('token')
                            }
                        });
                        console.log('Vehicle added successfully:', response.data);
                        resetForm()
                        sweetAlertFunc()
                    } catch (error) {
                        console.error('Error adding vehicle:', error);
                    }
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='select-wrapper'>
                            <label htmlFor="vehicleType">Vehicle Type</label>
                            <Field as="select" name="vehicleTypeId">
                                <option value="">Select Vehicle Type</option>
                                {vehicleTypes.data.map((type) => (
                                    <option key={type._id} value={type._id}>{type.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="vehicleTypeId" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="vehicleNumber">Vehicle Number</label>
                            <Field type="text" name="vehicleNumber" />
                            <ErrorMessage name="vehicleNumber" component="div" className="error-message" />
                        </div>
                        <Button type="submit" disabled={isSubmitting}>Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
