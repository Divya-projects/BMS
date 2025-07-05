import './App.css'
import Home from './pages/Home/home'
import Login from './pages/Login/login'
import Register from './pages/Register/register'
import Forget from './pages/Forget/forget'
import Admin from './pages/Admin'
import Movie from './pages/Movie'
import Partner from './pages/Partner'
import Profile from './pages/Profile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import store from './redux/store'
import { Provider } from 'react-redux'
import BookShow from './pages/BookShow'
import Reset from './pages/Reset/index'

function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ 
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            } />
            <Route path='/movies/:movieId' element={ 
            <ProtectedRoute>
              <Movie />
            </ProtectedRoute>
            } />
            <Route path='/book-show/:showId' element={ 
            <ProtectedRoute>
              <BookShow />
            </ProtectedRoute>
            } />
            <Route path='/admin' element={ 
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
            } />
            <Route path='/profile' element={ 
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
            } />
            <Route path='/partner' element={ 
            <ProtectedRoute>
              <Partner />
            </ProtectedRoute>
            } />
          <Route path='login' element={ <Login /> }/>
          <Route path='register' element={ <Register /> } />
          <Route path='forget' element={ <Forget /> } />
          <Route path='reset' element={ <Reset /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
    
      
    </>
  )
}

export default App
