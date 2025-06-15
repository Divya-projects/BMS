import './App.css'
import Home from './pages/Home/home'
import Login from './pages/Login/login'
import Register from './pages/Register/register'
import Forget from './pages/Forget/forget'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Home />} />
      <Route path='login' element={ <Login /> }/>
      <Route path='register' element={ <Register /> } />
      <Route path='forget' element={ <Forget /> } />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
