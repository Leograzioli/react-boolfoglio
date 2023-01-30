import './App.css'
import { Routes, Link, Route, BrowserRouter } from 'react-router-dom'

// pages 
import Home from './pages/Home'
import About from './pages/About'
import SingleProject from './pages/SingleProject'


function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <nav className='nav-bar'>
        <Link to='/'>Home </Link>
        <Link to='/about'> About</Link>
      </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/project/:slug' element={<SingleProject />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App