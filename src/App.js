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
import ReportDetails from "./myComponents/ReportDetails";
import ReportsList from "./myComponents/ReportList";
import NewReportForm from "./myComponents/NewReportForm";
import AdminDashboard from "./pages/admin-dashboard"




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
        <Route path="/myreports" element={<ReportsList />} />
        <Route path="/newreport" element={<NewReportForm />} />      
        <Route path="/report/:id" element={<ReportDetails />} /> 
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
       
 
      </Routes>
    </Router>
  );
}

export default App;




