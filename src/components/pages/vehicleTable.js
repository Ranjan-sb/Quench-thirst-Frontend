import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { VehicleTypeContext } from '../../context/VehicleTypeContext'
import DataTable from 'react-data-table-component'

export default function VehicleTable() {
    const [vehicles, setVehicles] = useState([])
    //const [vehicleTypesData, setVehicleTypesData] = useState([]);
    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);

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
        })()
    }, [])

    // useEffect(()=>{
    //     (async()=>{
    //         try{
    //             const response = await axios.get('http://localhost:3100/api/vehicleType',{
    //                 headers : {
    //                     Authorization : localStorage.getItem('token')
    //                 }
    //             })
    //             console.log(response.data)
    //             setVehicleTypesData(response.data)
    //         }catch(error){
    //             setError('Error fetching vehicle Types');
    //             console.log(error)
    //         }finally {
    //             setLoading(false);
    //         }
    //     })()
    // },[])

    const columns = [
        {
            name: 'Vehicle Number',
            selector: row => row.vehicleNumber,
            sortable: true,
        },
        {
            name: 'Vehicle Type Name',
            selector : row => 
            {
                const vehicleType = vehicleTypes.data.find(type => type._id === row.vehicleTypeId);
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