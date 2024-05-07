import { ErrorMessage, Field } from 'formik';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';
export default function BankAccountDetails() {
    return(
        <div>
        <h4>Bank Account Details</h4>
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

    )
    
}