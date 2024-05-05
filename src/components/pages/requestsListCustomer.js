import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setServerErrors, startGetRequests, startRemoveRequest } from "../../actions/request-action";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export default function RequestListForCustomer() {
    const [page, setPage]=useState(1)
    const [limit, setLimit]=useState(5||10)
    const [orderTypeSearch, setOrderTypeSearch]=useState('')
    const [purposeSearch, setPurposeSearch]=useState('')
    const [loading, setLoading] = useState(false);

    const requests = useSelector((state) => {
        return state.requests;
    });

    const totalPages = useSelector((state) => state.requests.totalPages);

    useEffect(()=>{
        setLoading(true)
        dispatch(startGetRequests(page,limit,orderTypeSearch,purposeSearch))  
            .then(()=>setLoading(false))
            .catch(()=>setLoading(false))   
    },[page,limit,orderTypeSearch,purposeSearch])
    

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setServerErrors([]));
        };
    }, []);

    const [id, setId] = useState('');
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
        dispatch(setServerErrors([]));
    };

    const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure?");
        if (userConfirm) {
            dispatch(startRemoveRequest(id));
        }
    };

    

    return (
        <>
            <div className="container mt-4">
                <h3>Request Details</h3>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label><b>Order-Type:</b></label>
                            <input
                                type="text" 
                                className="form-control"
                                value={orderTypeSearch} 
                                onChange={(e)=>setOrderTypeSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label><b>Purpose:</b></label>
                            <input
                                type='text' 
                                className="form-control"
                                value={purposeSearch}
                                onChange={(e)=>setPurposeSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* {requests.length===0 ? ( */}
            {/* {requests.data.length === 0  ? ( */}
            {requests.data.filter((request) => request.status === 'pending' && (!orderTypeSearch || request.orderType.includes(orderTypeSearch)) && (!purposeSearch || request.purpose.includes(purposeSearch))).length === 0 ? (
            
                <p><b>THERE IS NO REQUEST DATA FOR THIS CUSTOMER TO DISPLAY</b></p>
            ) : (
                <>
                
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
                        {/* {requests.map((ele)=>{ */}
                        {requests.data.filter((request)=>{return request.status==='pending'}).length === 0?
                        
                        <p><br /><b>No Request data to display</b></p>:
                        requests.data.filter((request)=>{return request.status==='pending'}).map((ele) => {
                            const formattedDate = new Date(ele.orderDate).toISOString().split('T')[0];
                            return (
                                <tr key={ele._id}>
                                    <td>{ ele.vehicleTypeId?.name }</td>
                                    <td>{ele.orderType}</td>
                                    <td>{formattedDate}</td>
                                    <td>{ele.quantity}</td>
                                    <td>{ele.purpose}</td>
                                    {/* <td>{ ele.customerAddress }</td> */}
                                    <td>
                                        <button onClick={() => {
                                            setId(ele._id);
                                            toggle();
                                        }}>show</button>

                                        <button onClick={() => {
                                            handleRemove(ele._id);
                                        }}>remove</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                    <nav aria-label="Page navigation example ">
                        <ul className="pagination d-flex justify-content-end">
                            <li className="page-item">
                                            <button 
                                                className="page-link" 
                                                onClick={() => {setPage(prev=>prev- 1)}} 
                                                disabled={page <=1} 
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        {/* {[...Array(Math.ceil(requests.totalCount / limit)).keys()].map((num) => (
                                            <li key={num} className={`page-item ${page === num + 1 ? 'active' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => setPage(num + 1)}
                                                >
                                                    {num + 1}
                                                </button>
                                            </li>
                                        ))} */}
                                        <li><b>{page}</b></li>
                                        <li className="page-item">
                                            <button 
                                                className="page-link" 
                                                onClick={() =>{setPage(prev=>prev+ 1)}}
                                            >
                                                Next
                                            </button>
                                        </li>
                        </ul>
                    </nav>
                </>

            )}

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Request Details</ModalHeader>
                <ModalBody>
                    <ul>
                        {id && (
                            <>
                                {requests.data
                                    .filter((ele) => ele._id === id)
                                    .map((requestDetails) => (
                                        
                                        <div key={requestDetails._id}>
                                            <p><b>VehicleType : </b> {requestDetails.vehicleTypeId?.name}</p>
                                            <p><b>OrderType : </b> {requestDetails.orderType}</p>
                                            <p><b>Order Date : </b> {new Date(requestDetails.orderDate).toISOString().split('T')[0]}</p>
                                            <p><b>Quantity : </b> {requestDetails.quantity}</p>
                                            <p><b>Purpose : </b> {requestDetails.purpose}</p>
                                            <p><b>Address : </b> {requestDetails.customerAddress}</p>
                                        </div>
                                    ))}
                            </>
                        )}
                    </ul>
                </ModalBody>
            </Modal>
        </>
    );
}
