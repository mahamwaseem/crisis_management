import logo from './logo.svg';
import './App.css';
import Header from "./pages//header";
import HeroSection from "./pages/heroSection";
import AboutSection from "./pages/AboutSection";
import Footer from './pages/footer';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

            
      </Routes>
    </Router>
  );
}

export default App;




