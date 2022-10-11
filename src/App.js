import './App.css'
import Homepage from './components/Homepage'
import Loading from './components/Loading'
import { useState } from 'react'


function App() {
 
  const [load, setLoad] = useState(true)

  setTimeout(()=>{
    setLoad(false)
  },800)

  return (
    <>
      {load ? <Loading/> : <Homepage/>}
      
    </>
  )
}

export default App