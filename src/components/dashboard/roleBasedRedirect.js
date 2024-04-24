import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import AdminDashboard from './adminDashboard';
import CustomerDashboard from './customerDashboard';
//import SupplierDetailsForm from './supplierDetailsForm';
import VehicleForm from '../pages/vehicleForm';


export default function RoleBasedRedirect(){
    const [userRole,setUserRole] = useState(null)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')


    useEffect(()=>{
        if(token){
            const decodedToken = jwtDecode(token)
            const role = decodedToken.role
            setUserRole(role)
        }
    },[token])

    const renderDashboard = () => {
        switch (userRole) {
            case 'admin':
                return <AdminDashboard />;
                // return <HomePage />

            case 'supplier':
                // return <HomePage />
                return <VehicleForm />
                //return <SupplierDetailsForm />
            case 'customer':
                // return <HomePage />
                return <CustomerDashboard />;
            default:
                // Redirect to login page if role is not recognized or token is missing
                return navigate('/')
        }
    };

    return (
        <div>
            {userRole ? renderDashboard() : <p>Loading...</p>}
        </div>
    )
}