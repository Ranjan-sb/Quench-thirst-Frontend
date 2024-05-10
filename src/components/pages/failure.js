import {useEffect} from 'react'
import axios from 'axios'
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'

export default function Failure(){
        useEffect(()=>{
            (async()=>{
                try{
                    const stripeId = localStorage.getItem('stripeId')
                    const payment = await axios.put(`http://localhost:3100/api/payments/${stripeId}/failed`,{paymentStatus:"Failed"})
                    alert('Payment Failed')
                }catch(err){
                    console.log(err)
                    sweetAlertFunc()
                }
            })()
        },[])
        
        const navigate = useNavigate()

    const sweetAlertFunc = () => {
        Swal.fire({
            title: "Payment Info",
            text: "Payment UnSuccessful",
            icon: "error",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/customer-orders")
            }
        })
    }

    return (
        <div>
            <h3>Payment Failed</h3>    
        </div>
    )
}