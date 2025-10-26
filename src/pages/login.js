import { useState } from "react";
import axios from "axios";
import '../styles/login.css';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email: formData.email,
        password: formData.password
      });

      if (res.data.success) {
        alert('Login Successful!');
        
        
        localStorage.setItem("authToken", res.data.jwtToken);
        localStorage.setItem("userRole", res.data.role || res.data.user?.role);
        localStorage.setItem("userName", res.data.user?.name || res.data.name);
        localStorage.setItem("userEmail", res.data.user?.email || res.data.email);
        
        
        const userRole = res.data.role || res.data.user?.role;
        
        if (userRole === 'Admin') {
          window.location.href = "/admin-dashboard";
        } else if (userRole === 'Citizen') {
          window.location.href = "/Dashboard";
        } else {
         
          window.location.href = "/";
        }
      } else {
        alert(res.data.message || "Login failed!");
      }
    } catch (err) {
      console.log("Login error: ", err);
      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div>
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>
          <p className="login-footer">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;