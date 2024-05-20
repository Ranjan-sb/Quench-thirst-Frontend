// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Modal, ModalHeader, ModalBody } from 'reactstrap';

// export default function SupplierPreviousOrders() {
//     const [orders, setOrders] = useState([]);
//     const [id, setId] = useState('');
//     const [modal, setModal] = useState(false);

//     const toggle = () => {
//         setModal(!modal);
//     };

//     useEffect(() => {
//         (async () => {
//             try {
//                 const response = await axios.get("http://localhost:3100/api/prevOrders/supplier", {
//                     headers: {
//                         Authorization: localStorage.getItem('token')
//                     }
//                 });
//                 setOrders(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         })();
//     }, []);

//     return (
//         <>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>Order Date</th>
//                         <th>Quantity</th>
//                         <th>Purpose</th>
//                         <th>Order Type</th>
//                         <th>Is Fulfilled</th>
//                         <th>Payment Status</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map((ele) => {
//                         const formattedDate = new Date(ele.orderDate).toLocaleDateString();
//                         return (
//                             <tr key={ele._id}>
//                                 <td>{formattedDate}</td>
//                                 {ele.lineItems.map((item, index) => (
//                                     <React.Fragment key={index}>
//                                         <td>{item.quantity}</td>
//                                         <td>{item.purpose}</td>
//                                         <td>{item.orderType}</td>
//                                     </React.Fragment>
//                                 ))}
//                                 <td>{ele.isFulfilled ? "Yes" : "No"}</td>
//                                 <td>{ele.status}</td>
//                                 <td>
//                                     <button onClick={() => {
//                                         setId(ele._id);
//                                         toggle();
//                                     }}>Show</button>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>

//             <Modal isOpen={modal} toggle={toggle}>
//                 <ModalHeader toggle={toggle}>Order Details</ModalHeader>
//                 <ModalBody>
//                     {id && (
//                         <ul>
//                             {orders.filter((ele) => ele._id === id).map((orderDetails) => (
//                                 <div key={orderDetails._id}>
//                                     <p><b>Order Date:</b> {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
//                                     {orderDetails.lineItems.map((item, index) => (
//                                         <div key={index}>
//                                             <p><b>Vehicle Type:</b> {item.vehicleTypeId?.name}</p>
//                                             <p><b>Order Type:</b> {item.orderType}</p>
//                                             <p><b>Quantity:</b> {item.quantity}</p>
//                                             <p><b>Purpose:</b> {item.purpose}</p>
//                                         </div>
//                                     ))}
//                                     <p><b>Price:</b> {orderDetails.price}</p>
//                                     <p><b>Customer Name:</b> {orderDetails.customerId?.username}</p>
//                                     <p><b>Customer Contact Number:</b> {orderDetails.customerId?.mobileNumber}</p>
//                                     <p><b>Fulfilled:</b> {orderDetails.isFulfilled ? "Yes" : "No"}</p>
//                                     <p><b>Status:</b> {orderDetails.status}</p>
//                                 </div>
//                             ))}
//                         </ul>
//                     )}
//                 </ModalBody>
//             </Modal>
//         </>
//     );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export default function SupplierPreviousOrders() {
    const [orders, setOrders] = useState([]);
    const [id, setId] = useState('');
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:3100/api/prevOrders/supplier", {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setOrders(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            {orders.length === 0 ? (
                <p><b>There are no previous orders for this supplier to show</b></p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order Date</th>
                            <th>Quantity</th>
                            <th>Purpose</th>
                            <th>Order Type</th>
                            <th>Is Fulfilled</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((ele) => {
                            const formattedDate = new Date(ele.orderDate).toLocaleDateString();
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
                            );
                        })}
                    </tbody>
                </table>
            )}

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Order Details</ModalHeader>
                <ModalBody>
                    {id && (
                        <ul>
                            {orders.filter((ele) => ele._id === id).map((orderDetails) => (
                                <div key={orderDetails._id}>
                                    <p><b>Order Date:</b> {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
                                    {orderDetails.lineItems.map((item, index) => (
                                        <div key={index}>
                                            <p><b>Vehicle Type:</b> {item.vehicleTypeId?.name}</p>
                                            <p><b>Order Type:</b> {item.orderType}</p>
                                            <p><b>Quantity:</b> {item.quantity}</p>
                                            <p><b>Purpose:</b> {item.purpose}</p>
                                        </div>
                                    ))}
                                    <p><b>Price:</b> {orderDetails.price}</p>
                                    <p><b>Customer Name:</b> {orderDetails.customerId?.username}</p>
                                    <p><b>Customer Contact Number:</b> {orderDetails.customerId?.mobileNumber}</p>
                                    <p><b>Fulfilled:</b> {orderDetails.isFulfilled ? "Yes" : "No"}</p>
                                    <p><b>Status:</b> {orderDetails.status}</p>
                                </div>
                            ))}
                        </ul>
                    )}
                </ModalBody>
            </Modal>
        </>
    );
}
