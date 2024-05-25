const initialState={
  data:[]
}
export default function vehicleTypeReducer(state=initialState, action){
  switch(action.type){
    case "SET_VEHICLE_TYPE":{
      return {...state, data:action.payload}
    }
    case "REMOVE_VEHICLE_TYPE":{
      return {...state, data: state.data.filter(ele => ele._id !== action.payload._id) }
    }
    default:{
      return {...state}
    }
  }
}