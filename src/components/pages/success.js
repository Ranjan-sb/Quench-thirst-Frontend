import {useEffect} from 'react'
import axios from 'axios'
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
//import imageSrc from '../images/success.jpg';

export default function Success(){

    const navigate = useNavigate()

    const sweetAlertFunc = () => {
        Swal.fire({
            title: "Payment Info",
            text: "Payment Successful",
            icon: "success",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/customer-dashboard")
            }
        })
    }

    useEffect(()=>{
        (async()=>{
            try{
                const stripeId = localStorage.getItem('stripeId')
                const payment = await axios.put(`http://localhost:3100/api/payments/${stripeId}/success`,{paymentStatus:"Successful"})
                localStorage.removeItem('stripeId')
                sweetAlertFunc()
            }catch(err){
                console.log(err)
            }
        })()
    },[])
    return (
        <div>
            {/* <h1>Payment Success</h1>     */}
        </div>
    )
}