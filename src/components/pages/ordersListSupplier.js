import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setServerErrors } from "../../actions/orders-action";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


export default function OrdersListForSupplier() {
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
                    <ul>
                        {id && <>
                            {orders.data.filter((ele) => {
                                return ele._id === id
                            }).map((orderDetails) => {
                                return <div key={orderDetails._id}>
                                    {console.log(orderDetails)}
                                <p><b>VehicleType : </b> {orderDetails.lineItems.map(item=>item.vehicleTypeId)}</p>
                                <p><b>OrderType : </b> {orderDetails.lineItems.map(item=>item.orderType)}</p>
                                <p><b>Order Date : </b> {orderDetails.orderDate}</p>
                                <p><b>Quantity : </b> {orderDetails.lineItems.map(item=>item.quantity)}</p>
                                <p><b>Purpose : </b> {orderDetails.lineItems.map(item=>item.purpose)}</p>
                                <p><b>Address : </b> {orderDetails?.customerId?.building} , {orderDetails?.customerId?.locality}, {orderDetails.customerId.state}, {orderDetails.customerId.pinCode}, {orderDetails.customerId.country}</p>
                            </div>
                            })}
                        </>}

                    </ul>
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