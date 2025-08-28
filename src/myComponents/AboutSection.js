import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        {/* Header */}
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="about-main-title">About Our Platform</h2>
            <div className="title-underline"></div>
            <p className="about-subtitle">
              Revolutionizing crisis management through intelligent automation and real-time coordination
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <div className="about-content">
              <h3 className="about-section-title">Who We Are</h3>
              <p className="about-description">
                We are a team of experienced crisis management professionals, software engineers, 
                and data scientists who understand the critical importance of rapid response during 
                emergencies. Our platform was born from real-world experience in disaster response, 
                corporate crisis management, and emergency services coordination.
              </p>
              
              <h3 className="about-section-title">Our Mission</h3>
              <p className="about-description">
                To provide organizations with the most advanced, reliable, and user-friendly crisis 
                management platform that enables swift decision-making, seamless communication, and 
                effective resource coordination during critical situations.
              </p>

              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Organizations Trust Us</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Uptime Guarantee</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Expert Support</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="about-visual">
              <div className="about-image-container">
                <div className="about-main-circle">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div className="floating-elements">
                  <div className="element element-1">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 6.5 15.5 8zM12 19l-7-4v-6l7 4 7-4v6l-7 4z"/>
                    </svg>
                  </div>
                  <div className="element element-2">
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="element element-3">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                    </svg>
                  </div>
                  <div className="element element-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="row" id="features">
          <div className="col-12">
            <h3 className="features-title text-center mb-5">Why Choose Our Platform?</h3>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 6L12 8.5 14.5 6 17 8.5V11h-2V9.5L12 12.5 9 9.5V11H7V8.5L9.5 6zM7 13h2v4l3-3 3 3v-4h2v6H7v-6z"/>
                </svg>
              </div>
              <h4 className="feature-title">Advanced Analytics</h4>
              <p className="feature-description">
                Leverage AI-powered insights to predict crisis patterns, analyze response effectiveness, 
                and optimize your emergency protocols for better outcomes.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8.5 15H7.3l-2.55-8h1.4l1.8 6.4L9.75 7h1.4L8.5 15zm6.9 0h-1.4l-.77-2H10.8l-.77 2H8.6L11.05 7h1.4L15.4 15zm3.6 0h-1.3V7h1.3v8z"/>
                </svg>
              </div>
              <h4 className="feature-title">Multi-Channel Communication</h4>
              <p className="feature-description">
                Integrate SMS, email, voice calls, and social media alerts into one unified 
                communication system that reaches everyone instantly.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
              </div>
              <h4 className="feature-title">Enterprise Security</h4>
              <p className="feature-description">
                Bank-level encryption, secure data centers, and compliance with international 
                security standards ensure your sensitive information stays protected.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.09 8.26L22 9L16 14L18 22L12 19L6 22L8 14L2 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <h4 className="feature-title">Scalable Infrastructure</h4>
              <p className="feature-description">
                From small teams to global enterprises, our cloud-based platform scales 
                automatically to handle any size organization or crisis scenario.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 6V4l-8 8 8 8v-2.1c5 0 8.5-2.3 10-7.9-2.3 3.6-6 5-10 5z"/>
                </svg>
              </div>
              <h4 className="feature-title">Quick Deployment</h4>
              <p className="feature-description">
                Get up and running in minutes with our intuitive setup wizard, pre-built 
                templates, and comprehensive training resources.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 1H4C2.9 1 2 1.9 2 3v3.5L12 12l10-5.5V3c0-1.1-.9-2-2-2z"/>
                  <path d="M14 14.5l6.5-3.5L22 15v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4l1.5-4L10 14.5c.6.3 1.4.3 2 0z"/>
                </svg>
              </div>
              <h4 className="feature-title">24/7 Expert Support</h4>
              <p className="feature-description">
                Our dedicated crisis management experts are available around the clock to 
                provide guidance, training, and technical support when you need it most.
              </p>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default AboutSection;