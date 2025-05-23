import React from "react";

const About = () => (
  <div className="about-gradient-bg glass-card">
    <div className="container about-hero glass-card">
      <h1 className="about-title">About ShopEase</h1>
      <p className="about-subtitle">Empowering your shopping experience with innovation and care.</p>
    </div>
    <div className="container about-content glass-card">
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          ShopEase was founded with a simple mission: to make online shopping seamless, enjoyable, and accessible for everyone. From humble beginnings, we've grown into a trusted platform serving thousands of happy customers.
        </p>
      </section>
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          We strive to deliver the best products at the best prices, while providing exceptional customer service. Our team is passionate about technology, design, and making a positive impact in the e-commerce world.
        </p>
      </section>
      <section className="about-section">
        <h2>Meet the Team</h2>
        <div className="about-team">
          <div className="about-team-member">
            <div className="about-avatar" style={{background:'#43e97b'}}>A</div>
            <div>
              <strong>Alex Morgan</strong>
              <div>Founder & CEO</div>
            </div>
          </div>
          <div className="about-team-member">
            <div className="about-avatar" style={{background:'#2575fc'}}>J</div>
            <div>
              <strong>Jamie Lee</strong>
              <div>Lead Developer</div>
            </div>
          </div>
          <div className="about-team-member">
            <div className="about-avatar" style={{background:'#38f9d7'}}>S</div>
            <div>
              <strong>Sara Kim</strong>
              <div>Head of Design</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default About;
