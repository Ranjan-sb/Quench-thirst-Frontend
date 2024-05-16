import React, { useContext } from "react";
import { VehicleTypeContext } from "../../context/VehicleTypeContext";

export default function ShowPriceDetails() {
  const { vehicleTypes } = useContext(VehicleTypeContext);

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
