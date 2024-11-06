import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Books from './pages/Books';
import CreateBookPage from './pages/CreateBook';
function App() {
  const { loginSuccess } = useSelector((state) => state.auth);


  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-grow">
          <Routes>
            <Route path="/" element={loginSuccess ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/book" element={<Books />} />
            <Route path="/create" element={<CreateBookPage />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
