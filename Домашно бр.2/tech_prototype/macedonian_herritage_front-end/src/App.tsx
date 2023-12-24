import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/partial/Logout'
import MapPage from './components/Map'
import NoPage from './components/NoPage'
import Navbar from './components/partial/Navbar'
import ProtectedRoute from './components/partial/ProtectedRoute'
import Attraction from './components/Attraction'

function App() {

  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='/map' element={<ProtectedRoute component={MapPage} />} />
          <Route path='/attraction' element={<ProtectedRoute component={Attraction} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
