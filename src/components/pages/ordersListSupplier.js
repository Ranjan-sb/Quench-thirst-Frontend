import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux"
import { setServerErrors } from "../../actions/orders-action";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useAuth } from "../../context/AuthContext";
import { Icon } from "leaflet";
import pin from '../../img/pin.png'
import user1 from '../../img/user1.png'
import { startUpdateOrder } from "../../actions/orders-action";



export default function OrdersListForSupplier() {
    const customMarker = new Icon({
        iconUrl: pin,
        iconSize: [38, 38]
    })

    const supplierIcon = new Icon({
        iconUrl: user1,
        iconSize: [30, 30],
    })

    function reverseLatLon(arr) {
        return [arr[1], arr[0]]
    }

    const [suppliersCoordinate, setSuppliersCoordinate] = useState([])
    const { user } = useAuth()
    console.log("know_user-", user)

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:3100/api/suppliers/account', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log("supplier_details_1:", response.data.location.coordinates)
                setSuppliersCoordinate(response.data.location.coordinates)
            } catch (err) {
                console.log(err)
            }
        })();


    }, [])



    // const [center, setCenter]=useState(null)

    const orders = useSelector((state) => {
        return state.orders
    })
    console.log("orders-details-", orders)

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

    const handleIsFullFilled = (orderId) => {
        dispatch(startUpdateOrder(orderId))
    }

    return (
        <>
            <h3>Orders Details</h3>
            {orders.data.length === 0 ? (
                <p><b>THERE IS NO ORDERS DATA TO DISPLAY FOR THIS SUPPLIER</b></p>
            ) : (
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
                                    {ele.lineItems?.map((item, index) => (
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
                                        }}>Show</button>{' '}
                                        {!ele.isFulfilled && (
                                            <button onClick={() => {
                                                handleIsFullFilled(ele._id);
                                            }}>Fulfilled</button>
                                        )}
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
                    {/* <Map1 /> */}

                    <MapContainer center={suppliersCoordinate} zoom={13} style={{ height: "400px" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* Circle representing the radius */}
                        {/* <Circle center={center} radius={10 * 1000} /> */}

                        <Marker position={suppliersCoordinate} icon={supplierIcon}>
                            <Popup>
                                You are here
                            </Popup>
                        </Marker>

                        {/* Markers for customer locations */}
                        {orders.data.map((orderDetails) => (
                            <Marker
                                key={orderDetails._id} position={reverseLatLon(orderDetails.customerId.location.coordinates)}
                                icon={customMarker}
                            >

                                <Popup>
                                    Customer's location
                                </Popup>
                            </Marker>
                        ))}

                    </MapContainer>

                    <ul>
                        {id && <>
                            {orders.data.filter((ele) => {
                                return ele._id === id
                            }).map((orderDetails) => {
                                const formattedDate = new Date(orderDetails.orderDate).toISOString().split('T')[0];
                                return <div key={orderDetails._id}>
                                    {console.log(orderDetails)}
                                    <p><b>VehicleType : </b> {orderDetails.lineItems.map(item => item.vehicleTypeId?.name)}</p>
                                    <p><b>OrderType : </b> {orderDetails.lineItems.map(item => item.orderType)}</p>
                                    <p><b>Order Date : </b> {formattedDate}</p>
                                    <p><b>Quantity : </b> {orderDetails.lineItems.map(item => item.quantity)}</p>
                                    <p><b>Purpose : </b> {orderDetails.lineItems.map(item => item.purpose)}</p>
                                    <p><b>Address : </b> {orderDetails?.customerId?.building} , {orderDetails?.customerId?.locality}, {orderDetails?.customerId?.state}, {orderDetails?.customerId?.pinCode}, {orderDetails?.customerId?.country}</p>
                                    <p><b>Co-ordinates:</b>
                                        {orderDetails?.customerId?.location?.coordinates[0]},{orderDetails?.customerId?.location?.coordinates[1]}
                                    </p>
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