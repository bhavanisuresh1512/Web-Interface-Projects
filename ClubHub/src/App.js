import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './Home';
import Clubs from './Clubs';
import Events from './Events';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Signup from './Signup';
import Register from './Register';
import Achievements from './Achievements';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/clubs" element={<Clubs />} />

        <Route path="/events" element={<Events />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Register Event */}
        <Route path="/register" element={<Register />} />

        {/* Achievements */}
        <Route
          path="/achievements"
          element={<Achievements />}
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div style={{
              textAlign: 'center',
              padding: '100px',
              color: '#390517'
            }}>
              <h1>404</h1>
              <p>Page Not Found</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;