import './App.css'
import Signin from './pages/Signin'
import Home from './pages/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin></Signin>}/> 
        <Route path="/home" element={<Home></Home>}/> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
