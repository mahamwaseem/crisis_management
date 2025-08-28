import logo from './logo.svg';
import './App.css';
import Header from "./myComponents/header";
import HeroSection from "./myComponents/heroSection";
import AboutSection from "./myComponents/AboutSection";
import Footer from './myComponents/footer';
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
