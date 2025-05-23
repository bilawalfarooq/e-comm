import React from "react";
import "../styles/App.css";

const Footer = () => (
  <footer className="footer glass-card pro-footer">
    <div className="footer-main">
      <div className="footer-col footer-brand">
        <div className="footer-google-rating">
          <img src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png" alt="Google" style={{height:24,verticalAlign:'middle'}} />
          <span className="footer-rating-stars">★★★★★</span>
          <span className="footer-rating-count">200+</span>
        </div>
        <a href="#" className="footer-review-link">View our 5.0 Google rating</a>
        <div className="footer-social">
          <a href="#" aria-label="Facebook" className="footer-social-icon"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.005 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17.005 22 12z"/></svg></a>
          <a href="#" aria-label="Instagram" className="footer-social-icon"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.25a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5zm0 1.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5zm6.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg></a>
        </div>
      </div>
      <div className="footer-col">
        <h4>Products</h4>
        <ul>
          <li>All shirts</li>
          <li>Hoodies</li>
          <li>Crewneck</li>
          <li>Hats</li>
          <li>Tote bags</li>
          <li><a href="#">See more</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Services</h4>
        <ul>
          <li>Embroidery</li>
          <li>Screen printing</li>
          <li>DTG printing</li>
          <li>Design Studio</li>
          <li>Design Templates</li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Help</h4>
        <ul>
          <li>Privacy policy</li>
          <li>FAQ</li>
          <li>Promo Codes</li>
          <li>Design Review</li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Contact</h4>
        <address>
          2633 S Broadway, Los Angeles, CA 90007<br/>
          <a href="tel:8778074909">Call (877) 807-4909</a><br/>
          <a href="mailto:info@syesveprint.com">info@syesveprint.com</a>
        </address>
        <div className="footer-contact-links">
          <a href="#">Chat with an Expert</a>
        </div>
      </div>
    </div>
    <div className="footer-payments">
      {/* Visa */}
      <span title="Visa" style={{background:'#fff',borderRadius:6,padding:'2px 8px',display:'inline-block'}}>
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" rx="6" fill="#fff"/><g><path d="M13.5 22L17 10h3l-3.5 12h-3zm7.5 0l-1.5-12h2.8l1.5 12h-2.8zm6.5 0l-2.5-12h2.7l1.5 7.5L31 10h2.7l-2.5 12h-2.7zm7.5 0l-1.5-12h2.8l1.5 12h-2.8z" fill="#1A1F71"/></g></svg>
      </span>
      {/* Mastercard */}
      <span title="Mastercard" style={{background:'#fff',borderRadius:6,padding:'2px 8px',display:'inline-block',marginLeft:8}}>
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" rx="6" fill="#fff"/><circle cx="20" cy="16" r="8" fill="#EB001B"/><circle cx="28" cy="16" r="8" fill="#F79E1B"/><path d="M24 16a8 8 0 0 1-4 6.93A8 8 0 0 0 28 24a8 8 0 0 0 4-6.93A8 8 0 0 1 24 16z" fill="#FF5F00"/></svg>
      </span>
      {/* Paypal */}
      <span title="Paypal" style={{background:'#fff',borderRadius:6,padding:'2px 8px',display:'inline-block',marginLeft:8}}>
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" rx="6" fill="#fff"/><g><path d="M18 24l2-12h6c3.5 0 5.5 2.2 5 5.5-.4 2.5-2.5 4.5-5 4.5h-4l-1 6h-3z" fill="#003087"/><path d="M32 17.5c.5-3.3-1.5-5.5-5-5.5h-6l-2 12h3l1-6h4c2.5 0 4.6-2 5-4.5z" fill="#3086C8"/></g></svg>
      </span>
      {/* Google Pay */}
      <span title="Google Pay" style={{background:'#fff',borderRadius:6,padding:'2px 8px',display:'inline-block',marginLeft:8}}>
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" rx="6" fill="#fff"/><g><path d="M20.5 16c0-2.5 2-4.5 4.5-4.5 1.2 0 2.3.5 3.1 1.3l-1.3 1.3c-.5-.5-1.2-.8-1.8-.8-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7c.8 0 1.5-.3 2-.8l1.3 1.3c-.8.8-1.9 1.3-3.1 1.3-2.5 0-4.5-2-4.5-4.5z" fill="#4285F4"/><path d="M32 16c0-2.5-2-4.5-4.5-4.5-1.2 0-2.3.5-3.1 1.3l1.3 1.3c.5-.5 1.2-.8 1.8-.8 1.5 0 2.7 1.2 2.7 2.7s-1.2 2.7-2.7 2.7c-.8 0-1.5-.3-2-.8l-1.3 1.3c.8.8 1.9 1.3 3.1 1.3 2.5 0 4.5-2 4.5-4.5z" fill="#34A853"/></g></svg>
      </span>
      {/* Apple Pay */}
      <span title="Apple Pay" style={{background:'#fff',borderRadius:6,padding:'2px 8px',display:'inline-block',marginLeft:8}}>
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" rx="6" fill="#fff"/><g><path d="M30.5 18.5c-.2-1.2 1-1.8 1-1.8-.6-.9-1.5-1-1.8-1-.8 0-1.5.5-1.9.5-.4 0-1-.5-1.7-.5-1.3 0-2.7 1.1-2.7 3.1 0 1.2.5 2.5 1.1 3.3.5.7 1.1 1.5 1.9 1.5.7 0 1-.5 1.9-.5.9 0 1.1.5 1.8.5.8 0 1.3-.7 1.8-1.5.6-.8.8-1.6.8-1.7-.1-.1-1.5-.6-1.5-2.4zM28.7 15.2c.3-.4.5-1 .4-1.6-.4 0-1.1.3-1.4.7-.3.3-.5.9-.4 1.5.5.1 1.1-.2 1.4-.6z" fill="#000"/></g></svg>
      </span>
      {/* Amex */}
      <span title="Amex" style={{background:'#fff',borderRadius:6,padding:'2px 8px',display:'inline-block',marginLeft:8}}>
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="32" rx="6" fill="#fff"/><g><text x="24" y="21" textAnchor="middle" fill="#2E77BB" fontSize="16" fontWeight="bold" fontFamily="Arial">AMEX</text></g></svg>
      </span>
    </div>
    <div className="footer-bottom">
      <div className="footer-cities">
        Los Angeles, Long Beach, San Diego, San Jose, San Francisco, Irvine, New York, Seattle, WA, Bakersfield, CA, Las Vegas
      </div>
      <div className="footer-links">
        <span>©2022, All right reserved.</span>
        <a href="#">Home</a>
        <a href="#">Blog</a>
        <a href="#">Site Map</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;
