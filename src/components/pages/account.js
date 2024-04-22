import { useAuth } from "../../context/AuthContext"
export default function Account() {
    const { user } = useAuth()
    return (
        <div>
            <h2>Account Info</h2>
            { user && (
                <div> 
                    <p>Username - { user.username }</p>
                    <p>Mobile Number - {user.mobileNumber}</p>
                    <p>Email - { user.email }</p>
                    <p>Role - { user.role }</p>
                    {user.role === 'customer' && (
                        <p>
                            <b>Address : </b> <br />
                            {user.building},<br /> {user.locality} <br />
                            {user.city} - {user.pinCode} <br />
                            {user.state} <br />{user.country}
                        </p>
                    )}
                </div> 
            )}
            
        </div>
    )
}