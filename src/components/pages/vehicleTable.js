import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { VehicleTypeContext } from '../../context/VehicleTypeContext'
import DataTable from 'react-data-table-component'

export default function VehicleTable() {
    const [vehicles, setVehicles] = useState([])
    const [vehicleTypesData, setVehicleTypesData] = useState([]);
    const { vehicleTypes } = useContext(VehicleTypeContext)

    useEffect(() => {
        (async () => {
            try {
                const vehicles = await axios.get('http://localhost:3100/api/vehicles', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                setVehicles(vehicles.data)
            } catch (error) {
                console.log(error)
            }

            // Extract and store vehicle types data separately
            if (vehicleTypes.data) {
                setVehicleTypesData(vehicleTypes.data);
        }
        })()
    }, [vehicleTypes.data])

    //const isDataAvailable = vehicleTypes.data && vehicleTypes.data.length > 0;

    const columns = [
        {
            name: 'Vehicle Number',
            selector: row => row.vehicleNumber,
            sortable: true,
        },
        {
            name: 'Vehicle Type Name',
            selector: row => {
                const vehicleType = vehicleTypes.data.find(type => type._id === row.vehicleTypeId)
                console.log(vehicleType)
                return vehicleType ? vehicleType.name : 'Unknown';
            },
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <button>Update</button>{" "}
                    <button>Delete</button>
                    {/* <button onClick={() => handleApprove(row._id)}>Approve</button>
                        <button onClick={() => handleRemove(row._id)}>Reject</button>
                        <button onClick={() => handleShow(row._id)}>Show</button> */}
                </>
            )
        }
    ]

    return (
        <div>
            <DataTable
                title="Vehicle Details"
                columns={columns}
                data={vehicles}
                pagination
                responsive
            />
        </div>
    );
}