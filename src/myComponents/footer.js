import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="row justify-content-between align-items-center">

            {/* Company Info */}
            <div className="col-md-6 mb-3">
              <div className="footer-company">
                <h3 className="logo-text">R2R</h3>
                <span className="logo-tagline">Crisis Management Platform</span>
                <p className="company-description">
                  Empowering organizations with intelligent crisis management solutions.
                </p>
                <div className="contact-info">
                  <p>📍 123 Crisis Management St, Emergency City</p>
                  <p>📞 +1 (555) 123-CRISIS</p>
                  <p>✉️ support@r2rplatform.com</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="col-md-4 mb-3 text-md-end text-center">
              <h5 className="social-title">Follow Us</h5>
              <div className="social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom text-center">
        <p>&copy; 2025 R2R Crisis Management Platform. All rights reserved.</p>
      </div>

      {/* Emergency Notice */}
      <div className="emergency-notice">
        <div className="container">
          <div className="notice-content">
            <strong>24/7 Emergency Support:</strong> Call our hotline at <strong>+1 (555) 911-HELP</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
