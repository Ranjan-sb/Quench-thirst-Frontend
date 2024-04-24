export default function vehicleTypeReducer(state, action){
  switch(action.type){
    case "SET_VEHICLE_TYPE":{
      return {...state, data:action.payload}
    }
    default:{
      return {...state}
    }
  }
}