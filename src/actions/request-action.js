import axios from 'axios'
export const startGetRequests = () => { 
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3100/api/requests',{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(setRequests(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const setRequests = (data) => {
    return { 
        type: 'SET_REQUESTS', 
        payload: data 
    }
}

export const setServerErrors = (errors) => {
    return { 
        type: "SET_ERRORS",
        payload: errors 
    }
}

export const startCreateRequest = (formData,resetForm) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3100/api/requests', formData,{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            dispatch(addRequest(response.data))
            dispatch(setServerErrors([]))
            resetForm()
        } catch(err) {
            console.log(err.response.data.errors)
            dispatch(setServerErrors(err.response.data.errors))
        }
    }
}

const addRequest = (request) => {
    return {
        type: "ADD_REQUEST",
        payload: request 
    }
}

export const startGetMyRequests = () => { 
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3100/api/requests/suppliers/my',{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            dispatch(setMyRequests(response.data))
            console.log(response.data)
        } catch(err) {
            alert(err.message)
        }
    }
}

const setMyRequests = (data) => {
    return { 
        type: 'SET_MY_REQUESTS', 
        payload: data 
    }
}

export const startRemoveRequest = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:3100/api/requests/${id}`,{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            dispatch(removeRequest(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const removeRequest = (request) => {
    return {
        type: 'REMOVE_REQUEST',
        payload: request
    }
}

export const startAcceptRequest = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:3100/api/requests/${id}/accept`,{},{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            dispatch(approveRequest(response.data._id))
        } catch(err) {
            alert(err.message)
        }
    }
}

const approveRequest = (requestId) => {
    return {
        type: 'APPROVE_REQUEST',
        payload: requestId
    }
}