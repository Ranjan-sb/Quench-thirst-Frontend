const initialState = {
    data: [],
    serverErrors: []
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CUSTOMER_ORDERS': {
            return { ...state, data: action.payload }
        }
        case 'SET_SUPPLIER_ORDERS': {
            return { ...state, data: action.payload }
        }
        
        case 'SET_ERRORS': {
            return { ...state, serverErrors: action.payload }
        }
        // case 'SET_MY_REQUESTS': {
        //     return { ...state, data: action.payload }
        // }
        // case 'REMOVE_REQUEST': {
        //     return { ...state, data: state.data.filter(ele => ele._id !== action.payload._id) }
        // }
        // case 'APPROVE_REQUEST': {
        //     return {
        //         ...state,
        //         data: state.data.map(request => {
        //             if (request._id === action.payload) {
        //                 return {
        //                     ...request,
        //                     status: 'accepted'
        //                 };
        //             }
        //             return request;
        //         })
        //     }
        // }
        default: {
            return { ...state }
        }
    }
}

export default ordersReducer

