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

            )}
            
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Order Details</ModalHeader>
                <ModalBody>
                {orders.data.map((ele) => {
                        if (ele._id === id) {
                            return (
                                <div key={ele._id}>
                                    <p><b>Status:</b> {ele.status}</p>
                                    <p><b>Order Date:</b> {ele.orderDate}</p>
                                    <p><b>Supplier ID:</b> {ele.supplierId}</p>
                                    <p><b>Customer ID:</b> {ele.customerId}</p>
                                    {ele.lineItems.map((item, index) => (
                                        <div key={index}>
                                            <p><b>Quantity:</b> {item.quantity}</p>
                                            <p><b>Purpose:</b> {item.purpose}</p>
                                            <p><b>Order Type:</b> {item.orderType}</p>
                                        </div>
                                    ))}
                                    <p><b>Price:</b> {ele.price}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </ModalBody>
            </Modal>
        </>
    )
}