import { Link } from 'react-router-dom';
import VehicleTable from '../pages/vehicleTable';

export default function SupplierDashboard(){
    return (
        <div>
            <h3>Supplier Dashboard</h3>
            <Link>Vehicle Detailss</Link>

            <VehicleTable />
            
        </div>
    )
}