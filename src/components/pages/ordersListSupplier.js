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
            {orders.data.length === 0 ? (
                <p><b>THERE IS NO ORDERS DATA TO DISPLAY FOR THIS SUPPLIER</b></p>
            ):(
                <table className="table">
                <thead>
                    <tr>
                        <th>orderDate</th>
                        <th>Quantity</th>
                        <th>Purpose</th>
                        <th>orderType</th>
                        <th>isFulfilled</th>
                        <th>Payment Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.data.map((ele) => {
                        const formattedDate = new Date(ele.orderDate).toISOString().split('T')[0];
                        return (
                            <tr key={ele._id}>
                                <td>{formattedDate}</td>
                                {ele.lineItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <td>{item.quantity}</td>
                                        <td>{item.purpose}</td>
                                        <td>{item.orderType}</td>
                                    </React.Fragment>
                                ))}
                                <td>{ele.isFulfilled ? "Yes" : "No"}</td>
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

            )}
            
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Order Details</ModalHeader>
                <ModalBody>
                    <ul>
                        {id && <>
                            {orders.data.filter((ele) => {
                                return ele._id === id
                            }).map((orderDetails) => {
                                const formattedDate = new Date(orderDetails.orderDate).toISOString().split('T')[0];
                                return <div key={orderDetails._id}>
                                    {console.log(orderDetails)}
                                <p><b>VehicleType : </b> {orderDetails.lineItems.map(item=>item.vehicleTypeId?.name)}</p>
                                <p><b>OrderType : </b> {orderDetails.lineItems.map(item=>item.orderType)}</p>
                                <p><b>Order Date : </b> {formattedDate}</p>
                                <p><b>Quantity : </b> {orderDetails.lineItems.map(item=>item.quantity)}</p>
                                <p><b>Purpose : </b> {orderDetails.lineItems.map(item=>item.purpose)}</p>
                                <p><b>Address : </b> {orderDetails?.customerId?.building} , {orderDetails?.customerId?.locality}, {orderDetails?.customerId?.state}, {orderDetails?.customerId?.pinCode}, {orderDetails?.customerId?.country}</p>
                                {/* <p><b>Supplier Name : </b>{orderDetails.supplierId?.username}</p> */}
                                <p><b>Customer Name : </b>{orderDetails.customerId?.username}</p>
                                <p><b>Customer Contact Number : </b>{orderDetails.customerId?.mobileNumber}</p>
                            </div>
                            })}
                        </>}

                    </ul>
                </ModalBody>
            </Modal>
        </>
    )
}