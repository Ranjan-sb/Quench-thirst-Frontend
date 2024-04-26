const initialState = {
    data: [],
    serverErrors: []
}

const requestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_REQUESTS': {
            return { ...state, data: action.payload }
        }
        case 'ADD_REQUEST': {
            return { ...state, data: [...state.data, action.payload] }
        }
        case 'SET_ERRORS': {
            return { ...state, serverErrors: action.payload }
        }
        case 'SET_MY_REQUESTS': {
            return { ...state, data: action.payload }
        }
        case 'REMOVE_REQUEST': {
            return { ...state, data: state.data.filter(ele => ele._id !== action.payload._id) }
        }
        case 'APPROVE_REQUEST': {
            return {
                ...state,
                data: state.data.map(request => {
                    if (request._id === action.payload) {
                        return {
                            ...request,
                            status: 'accepted'
                        };
                    }
                    return request;
                })
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default requestsReducer

// case 'UPDATE_PRODUCT' : {
//     return { ...state, data: state.data.map((ele) => {
//         if(ele._id === action.payload._id) {
//             return action.payload
//         } else {
//             return ele
//         }
//     })}
// }