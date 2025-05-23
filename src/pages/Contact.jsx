import React from "react";
import { FaUser, FaPhone, FaEnvelope, FaMapMarker } from "react-icons/fa";

const Contact = () => (
  <div className="contact-gradient-bg">
    <div className="container contact-flex">
      <div className="contact-illustration-info">
        <div className="contact-illustration">
          {/* SVG illustration */}
          <svg width="220" height="180" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="110" cy="90" rx="110" ry="90" fill="#fff" fillOpacity="0.15"/>
            <rect x="40" y="60" width="140" height="80" rx="16" fill="#fff"/>
            <rect x="60" y="80" width="100" height="40" rx="8" fill="#e3e9f7"/>
            <rect x="80" y="100" width="60" height="10" rx="5" fill="#b3b3f7"/>
            <rect x="100" y="120" width="20" height="6" rx="3" fill="#b3b3f7"/>
            <rect x="100" y="60" width="20" height="10" rx="5" fill="#43e97b"/>
            <rect x="60" y="60" width="20" height="10" rx="5" fill="#38f9d7"/>
            <rect x="140" y="60" width="20" height="10" rx="5" fill="#2575fc"/>
          </svg>
        </div>
        <div className="contact-info-card glass-card">
          <h2>Have Some Question?</h2>
          <p className="contact-desc">
            Thank you for your interest in our services. Please fill out the form below or e-mail us at
            <a href="mailto:support@shopease.com" className="contact-email"> support@shopease.com</a> and we will get back to you promptly regarding your request.
          </p>
          <div className="contact-info-list">
            <h3 className="contact-info-title">Get in touch</h3>
            <div className="contact-info-item"><FaPhone className="contact-info-icon" /> +1 234 567 890</div>
            <div className="contact-info-item"><FaEnvelope className="contact-info-icon" /> support@shopease.com</div>
            <div className="contact-info-item"><FaMapMarker className="contact-info-icon" /> 123 E-Commerce St, Online City</div>
          </div>
        </div>
      </div>
      <form className="contact-form-card glass-card">
        <div className="form-row">
          <div className="input-icon-group"><FaUser className="input-icon" /><input type="text" placeholder="First Name *" required className="contact-input" /></div>
          <div className="input-icon-group"><FaUser className="input-icon" /><input type="text" placeholder="Last Name *" required className="contact-input" /></div>
        </div>
        <div className="form-row">
          <div className="input-icon-group"><FaPhone className="input-icon" /><input type="tel" placeholder="Phone *" required className="contact-input" /></div>
          <div className="input-icon-group"><FaEnvelope className="input-icon" /><input type="email" placeholder="Email *" required className="contact-input" /></div>
        </div>
        <div className="input-icon-group"><FaEnvelope className="input-icon" /><textarea placeholder="Message" rows={4} className="contact-input contact-message" required></textarea></div>
        <button type="submit" className="contact-submit-btn">SEND MESSAGE</button>
        <p className="contact-privacy">ShopEase will not sell, share, or trade customer information. Your privacy is very important to us.</p>
      </form>
    </div>
    {/* Wave SVG divider */}
    <div className="contact-wave-divider">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M0,32L48,53.3C96,75,192,117,288,117.3C384,117,480,75,576,74.7C672,75,768,117,864,128C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path></svg>
    </div>
  </div>
);

export default Contact;
