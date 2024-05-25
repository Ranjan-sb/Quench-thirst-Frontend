import React, { useContext, useEffect } from "react";
import { VehicleTypeContext } from "../../context/VehicleTypeContext";
import { useAuth } from "../../context/AuthContext";
import { startRemoveVehicleType, startGetVehicleTypes } from "../../actions/vehicleType-action";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
//abcd

export default function ShowPriceDetails() {
  const { vehicleTypes } = useContext(VehicleTypeContext);
  const {user}=useAuth()
  console.log("knowUser-", user)

  const dispatch=useDispatch();

  useEffect(()=>{
      dispatch(startGetVehicleTypes)
  },[dispatch])

  // const handleDelete=(id)=>{
  //   if (window.confirm("Are you sure you want to delete this vehicle type?")) {
  //     dispatch(startRemoveVehicleType(id));
  //   }
  // }
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startRemoveVehicleType(id));
        Swal.fire(
          "Deleted!",
          "The vehicle type has been deleted.",
          "success"
        );
      }
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2 className="text-center">Price Details</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Vehicle Type Name</th>
              <th>Capacity(in Litres)</th>
              <th>Purpose</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {vehicleTypes.data.map((ele) => (
              <tr key={ele._id}>
                <td>{ele.name}</td>
                <td>{ele.capacity}</td>
                <td>
                  <ul>
                    {ele.prices.map((price) => (
                      <li key={price._id}>{price.purpose}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {ele.prices.map((price) => (
                      <li key={price._id}>₹{price.price}</li>
                    ))}
                  </ul>
                </td>
                {user && user.role==='admin' && (
                  <td>
                    <button 
                      onClick={()=>handleDelete(ele._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
