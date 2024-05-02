import {useEffect} from 'react'
import axios from 'axios'

export default function Failure(){
        useEffect(()=>{
            (async()=>{
                try{
                    const stripeId = localStorage.getItem('stripeId')
                    const payment = await axios.put(`http://localhost:3100/api/payments/${stripeId}/failed`,{paymentStatus:"Failed"})
                    alert('Payment Failed')
                }catch(err){
                    console.log(err)
                }
            })()
        },[])
    return (
        <div>
            <h3>Payment Failed</h3>    
        </div>
    )
}