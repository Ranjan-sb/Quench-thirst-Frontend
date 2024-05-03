import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Multistep from 'react-multistep';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SupplierDetailsForm() {
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate()
  const initialValues = {
    building: '',
    locality: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    licenseNumber: '',
    accHolderName: '',
    bank: '',
    accNum: '',
    IFSC: '',
    branch: ''
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:3100/api/suppliers', values, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      console.log(response.data);
      navigate('/supplier-dashboard')
    } catch (err) {
      console.log(err);
      setServerErrors(err.response.data.errors);
    }
  };

  const helperFunction = (name) => {
    return serverErrors
      .filter((ele) => ele.path === name)
      .map((ele, i) => {
        return <li key={i}>{ele.msg}</li>;
      });
  };

  const steps = [
    { name: 'Address Details', component: <AddressDetails helperFunction={helperFunction}/> },
    { name: 'Bank Account Details', component: <BankAccountDetails helperFunction={helperFunction}/> }
  ];

  return (
    <div>
      <h2>Suppliers Details Form :</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          building: Yup.string().max(40, 'Must be 40 characters or less').required('Required'),
          locality: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
          city: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
          state: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
          pinCode: Yup.number().max(999999, 'Must be 6 digits').required('Required'),
          country: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
          licenseNumber: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
          accHolderName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
          bank: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
          accNum: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
          IFSC: Yup.string().max(10, 'Must be 10 characters or less').required('Required'),
          branch: Yup.string().max(15, 'Must be 15 characters or less').required('Required')
        })}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            <Multistep showNavigation={true} steps={steps} /><br />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const AddressDetails = () => (
  <div>
    <h4>Address Details</h4>
    <FormGroup controlId="building">
      <FormLabel>Door No.</FormLabel>
      <Field type="text" name="building" placeholder="Enter building no. & name" as={FormControl} />
      <ErrorMessage className="text-danger" component="div" name="building" />
    </FormGroup>

    <FormGroup controlId="locality">
      <FormLabel>Locality</FormLabel>
      <Field type="text" name="locality" placeholder="Enter your Locality" as={FormControl} />
      <ErrorMessage className="text-danger" component="div" name="locality" />
    </FormGroup>

    <FormGroup controlId="city">
      <FormLabel>City</FormLabel>
      <Field type="text" name="city" placeholder="Enter your City" as={FormControl} />
      <ErrorMessage className="text-danger" component="div" name="city" />
    </FormGroup>

    <FormGroup controlId="state">
      <FormLabel>State</FormLabel>
      <Field type="text" name="state" placeholder="Enter your state" as={FormControl} />
      <ErrorMessage className="text-danger" component="div" name="state" />
    </FormGroup>

    <FormGroup controlId="pinCode">
      <FormLabel>Pincode</FormLabel>
      <Field type="text" name="pinCode" placeholder="Enter your pinCode" as={FormControl} />
      <ErrorMessage className="text-danger" component="div" name="pinCode" />
    </FormGroup>

    <FormGroup controlId="country">
      <FormLabel>Country</FormLabel>
      <Field type="text" name="country" placeholder="Enter your country" as={FormControl} />
      <ErrorMessage className="text-danger" component="div" name="country" />
    </FormGroup><br />
  </div>
);

const BankAccountDetails = () => (
  <div>
    <h3>Bank Account Details</h3>
    <FormGroup controlId="accHolderName">
      <FormLabel>Account Holder Name</FormLabel>
      <Field type="text" name="accHolderName" placeholder="Enter Account Holder Name " as={FormControl} />
      <ErrorMessage className="text-danger" component="div" name="accHolderName" />
    </FormGroup>

    <FormGroup controlId="bank">
      <FormLabel>Bank Name</FormLabel>
      <Field type="text" name="bank" placeholder="Enter Bank Name " as={FormControl} />
      <ErrorMessage className="text-danger" component="div" name="bank" />
    </FormGroup>

    <FormGroup controlId="accNum">
      <FormLabel>Account Number</FormLabel>
      <Field type="text" name="accNum" placeholder="Enter Account Number" as={FormControl} />
      <ErrorMessage className="text-danger" component="div" name="accNum" />
    </FormGroup>

    <FormGroup controlId="IFSC">
      <FormLabel>IFSC</FormLabel>
      <Field type="text" name="IFSC" placeholder="Enter IFSC" as={FormControl} />
      <ErrorMessage className="text-danger" component="div" name="IFSC" />
    </FormGroup>

    <FormGroup controlId="branch">
      <FormLabel>Branch</FormLabel>
      <Field type="text" name="branch" placeholder="Enter Branch Name" as={FormControl} />
      <ErrorMessage className="text-danger" component="div" name="branch" />
    </FormGroup>

    <FormGroup controlId="licenseNumber">
      <FormLabel>Business License Number</FormLabel>
      <Field type="text" name="licenseNumber" placeholder="Enter Business License Number" as={FormControl} />
      <ErrorMessage className="text-danger" component="div" name="licenseNumber" />
    </FormGroup><br />
  </div>
);
