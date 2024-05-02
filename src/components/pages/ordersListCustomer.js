import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setServerErrors } from "../../actions/orders-action";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export default function OrdersListForCustomer() {
    const orders = useSelector((state) => {
        return state.orders;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        
        return () => {
            dispatch(setServerErrors([]));
        };
    }, []);

    const [id, setId] = useState('');
    const [modal, setModal] = useState(false);
    const [vehicleTypeId,setVehicleTypeId]=useState('')
    
    const [show,setShow] = useState(false)

    const toggle = () => {
        setModal(!modal);
        dispatch(setServerErrors([]));
    };

    const makePayment = async(order)=>{
        try{
            const body = {
                amount:order.amount
            }
            
        const response = await axios.post(`http://localhost:3100/api/create-checkout-session?orderId=${order._id}`,body)
        
        //Store the transaction id in local storage
        localStorage.setItem('stripeId', response.data.id)
        
        //Redirecting the user to the chekout page of stripe
        window.location = response.data.url; 

        }catch(err){
            console.log(err)
        }
    }
    console.log(vehicleTypeId)
        

    const getName=(id)=>{
        setVehicleTypeId(id)
        setShow(!show)
    }    


    return (
        <>
            <h3>Orders Details</h3>
            {orders.data.length === 0 ? (
                <p><b>THERE IS NO ORDERS DATA TO DISPLAY FOR THIS CUSTOMER</b></p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
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
                                    <td>{ele.status}</td>
                                    <td>
                                        {ele.status === "incomplete" && (
                                            <button  onClick={(e)=>{
                                                makePayment(ele)
                                            }}>Pay</button>
                                        )}
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
                    {orders.data.map((ele) => {
                        const formattedDate = new Date(ele.orderDate).toISOString().split('T')[0];
                        if (ele._id === id) {
                            return (
                                <div key={ele._id}>
                                    <p><b>Status : </b> {ele.status}</p>
                                    <p><b>Order Date : </b> {formattedDate}</p>
                                    <p><b>Supplier Name : </b> {ele.supplierId?.username}</p>
                                    <p><b>Customer Name:</b> {ele.customerId?.username}</p>
                                    {ele.lineItems.map((item, index) => (
                                        <div key={index}>
                                            <p><b>Quantity:</b> {item.quantity}</p>
                                            <p><b>Purpose:</b> {item.purpose}</p>
                                            <p><b>Order Type : </b> {item.orderType}</p>
                                            <p><b>VehicleType : </b>{item.vehicleTypeId?.name}</p>
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
    );
}