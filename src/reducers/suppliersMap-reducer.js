const initialState = {
  data: [],
  serverErrors: []
};

const mapLocationReducer=(state=initialState, action)=>{
  switch (action.type){
    case 'SET_MAP_LOCATION':{
      return{...state, data:action.payload}
    }
    default:{
      return {...state}
    }
  }
}

export default mapLocationReducer