import React from 'react';
import '../styles/heroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background-overlay"></div>
      <div className="hero-background-pattern"></div>
      
      <div className="container">
        <div className="row align-items-center h-100">
          
          <div className="col-lg-6 hero-left-content">
            <div className="hero-text-content">
              <h1 className="hero-title">
                Report2Resolve
                <span className="title-highlight">Empowering Citizens</span>
              </h1>
              <p className="hero-description">
                Raise your voice against local issues. Connect with authorities, track solutions, and build a transparent community.
              </p>
              <div className="hero-features">
                <div className="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                  Verified & Trusted Reporting
                </div>
                <div className="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                 Location-Based Tracking
                </div>
                <div className="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                  Faster Resolutions
                </div>
              </div>
              
            </div>
          </div>
          
          
          <div className="col-lg-6 hero-right-content">
            <div className="hero-icon-container">
              <div className="hero-main-icon">
                <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="floating-icons">
                <div className="floating-icon icon-1">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="floating-icon icon-2">
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="floating-icon icon-3">
                  <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 11H7v9a2 2 0 002 2h8a2 2 0 002-2V9h2l-1-1h-4V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4l-1 1h2z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;