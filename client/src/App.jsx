import { useState } from 'react'
import axios from 'axios'


function App() {

  const [phone, setPhone]= useState();
  const [amount , setAmount] = useState()

  const payhandler =(e) =>{
    e.preventDefault()
axios.post("http://localhost:5000/token" , {
  phone,
  amount,
}).then((res)=>{
console.log(res)
  })
  .catch((res)=>{
    console.log(res)
      })


  }


  return (
    <div className='flex flex-col justify-items-center mt-10'>
    <h1>Pay with mpesa</h1>
    <form className='flex flex-col space-y-10'>
      <input 
      onChange={(e)=> setPhone(e.target.value) }
      placeholder='phone'
      className='bg-slate-300 text-center rounded-md'
      />
      <input 
      onChange={(e) => setAmount(e.target.value)}
      placeholder='amount'
      className='bg-slate-300 text-center rounded-md'
      />
      <button 
      onClick={payhandler}
      className='bg-blue-400 text-white rounded-xl'>Pay now</button>
    </form>
      
    </div>
  )
}

export default App
