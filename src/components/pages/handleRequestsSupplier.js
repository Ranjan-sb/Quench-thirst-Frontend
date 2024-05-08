import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setServerErrors } from "../../actions/request-action"
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { startAcceptRequest,startRejectRequest } from "../../actions/request-action";
import { useAuth } from "../../context/AuthContext";

export default function HandleRequests() {
    const {user} = useAuth()

    const requests = useSelector((state) => {
        return state.requests
    })
    console.log("daata-",requests.data)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(setServerErrors([]))
        }
    }, [])

    const [id, setId] = useState('')
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal)
        dispatch(setServerErrors([]))
    }

    const handleAccept = (id) => {
        dispatch(startAcceptRequest(id))
        toggle()
    }
    const handleReject = (id) => {
        const confirm = window.confirm("Are you sure?")
        if(confirm){
            dispatch(startRejectRequest(id))
            toggle()
        } 
    }


    console.log(user, 'user')
    const data = requests.data.filter((ele)=>{
        for(let i =0; i <ele.suppliers.length;i++){
            if(ele.suppliers[i]['supplierId'] === user._id){
                return true
            }
        }
    })

    console.log(data, 'data-after-filter')
    
    return (
        <>
            <h3>Request Details</h3>
            {data.length === 0 ? (
                <p><b>THERE IS NO REQUEST DATA TO DISPLAY FOR THIS SUPPLIER</b></p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>vehicleType</th>
                            <th>orderType</th>
                            <th>orderDate</th>
                            <th>Quantity</th>
                            <th>Purpose</th>
                            {/* <th>CustomerAddress</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((request) => { return request.status === 'pending' }).length === 0 ?
                            <p><br /><b>No Request data to display</b></p> :
                            data.filter((request) => { return request.status === 'pending' }).map((ele) => {
                                const formattedDate = new Date(ele.orderDate).toISOString().split('T')[0];
                                return (
                                    <tr key={ele._id}>
                                        <td>{ ele.vehicleTypeId?.name }</td>
                                        <td>{ele.orderType}</td>
                                        <td>{formattedDate}</td>
                                        <td>{ele.quantity}</td>
                                        <td>{ele.purpose}</td>
                                        {/* <td>{ ele.customerAddress }</td> */}
                                        <td><button onClick={() => {
                                            setId(ele._id)
                                            toggle()
                                        }}>show</button>
                                            {/* <button onClick={() => {
                                            handleEdit(ele._id)
                                        }}>edit</button> */}
                                            {/* <button onClick={() => {
                                            handleRemove(ele._id)
                                        }}>remove</button> */}
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            )}

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Request</ModalHeader>
                <ModalBody>
                    <ul>
                        {id && <>
                            {requests.data.filter((ele) => {
                                return ele._id === id
                            }).map((requestDetails) => {
                                const formattedDate = new Date(requestDetails.orderDate).toISOString().split('T')[0];
                                return <div key={requestDetails._id}>
                                    <p><b>VehicleType : </b> {requestDetails.vehicleTypeId?.name}</p>
                                    <p><b>OrderType : </b> {requestDetails.orderType}</p>
                                    <p><b>Order Date : </b> {formattedDate}</p>
                                    <p><b>Quantity : </b> {requestDetails.quantity}</p>
                                    <p><b>Purpose : </b> {requestDetails.purpose}</p>
                                    <p><b>Address : </b> {requestDetails.customerAddress}</p><br />
                                    <Button color="success" onClick={() => { handleAccept(requestDetails._id) }}>
                                        Accept
                                    </Button>{' '}
                                    <Button color="danger" className="ml-4" onClick={() => { handleReject(requestDetails._id) }}>
                                        Reject
                                    </Button>{' '}
                                </div>
                            })}
                        </>}
                    </ul>
                </ModalBody>
            </Modal>
        </>
    )
}