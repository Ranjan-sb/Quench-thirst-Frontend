const initialState = {
    data: [],
    totalPages:1,
    serverErrors: []
}

const requestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_REQUESTS': {
            return { ...state, data: action.payload.requests, totalPages: action.payload.totalPages }
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

        case 'REJECT_REQUEST': {
            console.log("a-p",action.payload)
            return {
                ...state,
                data: state.data.map(request => {
                    if (request._id === action.payload.requestId) {
                        console.log("req-",request)
                        return {
                            ...request,
                            // Remove the request from the suppliers' list for the current supplier
                            suppliers: request.suppliers.filter(supplier => {
                                console.log('supp--',supplier)
                                return supplier.supplierId !== action.payload.supplierId
                            })
                        };
                    }
                    return request;
                })
            }
        }
        // case 'REJECT_REQUEST': {
        //     const { supplierId, requestId } = action.payload;
        //     return {
        //         ...state,
        //         data: state.data.map(request => {
        //             if (request._id === requestId && request.supplierId === supplierId) {
        //                 return {
        //                     ...request,
        //                     status: 'rejected'
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