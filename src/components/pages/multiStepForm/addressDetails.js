import { ErrorMessage, Field } from 'formik';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';
export default function AddressDetailsForm() {
    return(
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
            <FormLabel>PinCode</FormLabel>
            <Field type="text" name="pinCode" placeholder="Enter your pinCode" as={FormControl} />
            <ErrorMessage className="text-danger" component="div" name="pinCode" />
        </FormGroup>

        <FormGroup controlId="country">
            <FormLabel>Country</FormLabel>
            <Field type="text" name="country" placeholder="Enter your country" as={FormControl} />
            <ErrorMessage className="text-danger" component="div" name="country" />
        </FormGroup><br />
    </div>

    )
    }