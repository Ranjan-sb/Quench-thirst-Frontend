import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setServerErrors } from "../../actions/request-action"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { startAcceptRequest } from "../../actions/request-action";
//import { startGetMyRequests } from "../../actions/request-action"; 

export default function HandleRequests() {
    const requests = useSelector((state) => {
        return state.requests
    })

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

    return (
        <>
            <h3>Request Details</h3>
            <table className="table">
                <thead>
                    <tr>
                        {/* <th>vehicleTypeId</th> */}
                        <th>orderType</th>
                        <th>orderDate</th>
                        <th>Quantity</th>
                        <th>Purpose</th>
                        {/* <th>CustomerAddress</th> */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.data.map((ele) => {
                        return (
                            <tr key={ele._id}>
                                {/* <td>{ ele.vehicleTypeId }</td> */}
                                <td>{ele.orderType}</td>
                                <td>{ele.orderDate}</td>
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

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Request</ModalHeader>
                <ModalBody>
                    <ul>
                        {id && <>
                            {requests.data.filter((ele) => {
                                return ele._id === id
                            }).map((requestDetails) => {
                                return <div key={requestDetails._id}>
                                    <p><b>VehicleType : </b> {requestDetails.vehicleTypeId}</p>
                                    <p><b>OrderType : </b> {requestDetails.orderType}</p>
                                    <p><b>Order Date : </b> {requestDetails.orderDate}</p>
                                    <p><b>Quantity : </b> {requestDetails.quantity}</p>
                                    <p><b>Purpose : </b> {requestDetails.purpose}</p>
                                    <p><b>Address : </b> {requestDetails.customerAddress}</p><br />
                                    <Button color="primary" onClick={() => { handleAccept(requestDetails._id) }}>
                                        Accept
                                    </Button>{' '}
                                </div>
                            })}
                        </>}

                    </ul>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        </>
    )


}