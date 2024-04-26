import axios from 'axios'
export const startGetCustomerOrders = () => { 
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3100/api/orders/customer',{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            //console.log(response.data)
            dispatch(setCustomerOrders(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const setCustomerOrders = (data) => {
    return { 
        type: 'SET_CUSTOMER_ORDERS', 
        payload: data 
    }
}

export const setServerErrors = (errors) => {
    return { 
        type: "SET_ERRORS",
        payload: errors 
    }
}

export const startGetSupplierOrders = () => { 
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3100/api/orders/supplier',{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            //console.log(response.data)
            dispatch(setSupplierOrders(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const setSupplierOrders = (data) => {
    return { 
        type: 'SET_SUPPLIER_ORDERS', 
        payload: data 
    }
}