import logo from './logo.svg';
import './App.css';
import Header from "./pages//header";
import HeroSection from "./pages/heroSection";
import AboutSection from "./pages/AboutSection";
import Footer from './pages/footer';
import "@fortawesome/fontawesome-free/css/all.min.css";


function App() {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <AboutSection/>
      <Footer/>
    </div>
  );
}

export default App;
