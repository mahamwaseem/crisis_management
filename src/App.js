import logo from './logo.svg';
import './App.css';
import Header from "./pages//header";
import HeroSection from "./pages/heroSection";
import AboutSection from "./pages/AboutSection";
import Footer from './pages/footer';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Signup from "./pages/Signup";
import Login from "./pages/login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard  from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />  
              <HeroSection />
              <AboutSection />
              <Footer />
            </>
          }
        />

        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />

            
      </Routes>
    </Router>
  );
}

export default App;




