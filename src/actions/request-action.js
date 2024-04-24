import axios from 'axios'
export const startGetRequests = () => { 
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3100/api/requests',{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
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