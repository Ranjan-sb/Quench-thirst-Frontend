import {useEffect} from 'react'
import axios from 'axios'
//import imageSrc from '../images/success.jpg';

export default function Success(){
    useEffect(()=>{
        (async()=>{
            try{
                const stripeId = localStorage.getItem('stripeId')
                const payment = await axios.put(`http://localhost:3100/api/payments/${stripeId}/success`,{paymentStatus:"Successful"})
            }catch(err){
                console.log(err)
            }
        })()
    },[])
    return (
        <div>
            <h1>Payment Success</h1>    
        </div>
    )
}