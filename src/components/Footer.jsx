import React from "react";
import "../styles/App.css";

const Footer = () => (
  <footer className="footer pro-footer">
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
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/MasterCard_Logo.svg" alt="Mastercard" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Paypal_2014_logo.png" alt="Paypal" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Pay_Logo.svg" alt="Google Pay" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Apple_Pay_logo.svg" alt="Apple Pay" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/American_Express_logo_%282018%29.svg" alt="Amex" />
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
