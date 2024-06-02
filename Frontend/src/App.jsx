import { useState } from 'react'
import Work from './components/Work'
import Home from './components/Home'
import Desc from './components/Desc'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Contact from './components/Contact'
import './App.css'
import Slider from './components/Slider'
import Capabilities from './components/Capabilities'


function App() {
  const [count, setCount] = useState(0)

  return (
   <>
  
   <BrowserRouter>
   <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/work" element ={<Work/>}/>
        <Route path="/cat" element ={<>cat</>}/>
        <Route path ="/work/workdes/:id" element={<Desc/>}/>
        <Route path ="/Contact" element={<Contact/>}/>
        <Route path ="/capabilities" element={<Capabilities/>}/>
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
