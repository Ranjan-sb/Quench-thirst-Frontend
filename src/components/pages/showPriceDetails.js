import React,{ useContext } from "react"
import { VehicleTypeContext } from "../../context/VehicleTypeContext"

export default function ShowPriceDetails(){
     // const {vehicleTypes, VehicleTypeDispatch}=useContext(VehicleTypeContext)
  const {vehicleTypes}=useContext(VehicleTypeContext)
  
  return(
    <div className="row">
      <table className="table">
        <thead>
          <tr>
            <th>Vehicle Type Name</th>
            <th>Capacity</th>
            <th>Purpose</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          { vehicleTypes.data.map((ele)=>{
            return(
              <React.Fragment key={ele._id}>
              <tr>
                <td>{ele.name}</td>
                <td>{ele.capacity}</td>
                <td>
                  <ul>
                    {ele.prices.map((price) => (
                      <li key={price._id}>
                        {price.purpose}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {ele.prices.map((price) => (
                      <li key={price._id}>
                        {price.price}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}