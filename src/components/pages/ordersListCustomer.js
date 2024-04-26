import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setServerErrors } from "../../actions/orders-action";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


export default function OrdersListForCustomer() {
    const orders = useSelector((state) => {
        return state.orders
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

    return (
        <>
            <h3>Orders Details</h3>
            <table className="table">
                <thead>
                    <tr>
                        {/* <th>vehicleTypeId</th> */}
                        <th>orderDate</th>
                        <th>Quantity</th>
                        <th>Purpose</th>
                        <th>orderType</th>
                        <th>Payment Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.data.map((ele) => {
                        return (
                            <tr key={ele._id}>
                                <td>{ele.orderDate}</td>
                                {ele.lineItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <td>{item.quantity}</td>
                                        <td>{item.purpose}</td>
                                        <td>{item.orderType}</td>
                                    </React.Fragment>
                                ))}
                                <td>{ele.status}</td>
                                <td>
                                    {ele.status === "incomplete" && (
                                        <button>Pay</button>
                                    )}
                                    <button onClick={() => {
                                        setId(ele._id);
                                        toggle();
                                    }}>Show</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Order Details</ModalHeader>
                <ModalBody>
                    {/* <ul>
                        {id && <>
                            {orders.data.filter((ele) => {
                                return ele._id === id
                            }).map((orderDetails) => {
                                return <div key={orderDetails._id}>
                                    <p><b>VehicleType : </b> {requestDetails.vehicleTypeId}</p>
                                    <p><b>OrderType : </b> {requestDetails.orderType}</p>
                                    <p><b>Order Date : </b> {requestDetails.orderDate}</p>
                                    <p><b>Quantity : </b> {requestDetails.quantity}</p>
                                    <p><b>Purpose : </b> {requestDetails.purpose}</p>
                                    <p><b>Address : </b> {requestDetails.customerAddress}</p>
                                </div>
                            })}
                        </>}

                    </ul> */}
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Accept
                    </Button>{' '}
                </ModalFooter> */}
            </Modal>
        </>
    )


}