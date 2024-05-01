import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext() 

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null) 

    const handleLogin = (user) => {
        setUser(user) 
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setUser(null) 
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            { children }
        </AuthContext.Provider>
    )
}