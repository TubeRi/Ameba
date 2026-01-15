import React from "react";
import "./About.css";

const team = [
  { name: "Julius", role: "Fullstack" },
];

const sponsors = [
  { name: "Could be your sponsor", img: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png", alt: "Sponsor" },
];

const About = ({ onBack }) => (
  <div className="about-bg">
    <div className="about-container">
      <h1 className="about-title">About <span>AMEBA</span></h1>
      <p className="about-desc">
        AMEBA is a cutting-edge platform that revolutionizes the way you connect, collaborate, and create. Our mission is to empower individuals and teams to unleash their full potential through innovative tools and a supportive community. Join us on this exciting journey and be a part of the future!
      </p>
      <h2 className="about-subtitle">Our team</h2>
      <p className="about-team-desc">
        Meet the passionate and talented individuals behind AMEBA. Our diverse team brings together a wealth of experience and expertise from various fields to deliver the best possible platform for our users.
      </p>
      <div className="about-team-grid">
        {team.map((member, i) => (
          <div className="about-card" key={member.name}>
            <div className="about-avatar">
              <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="cat" />
            </div>
            <div className="about-member-name">{member.name}</div>
            <div className="about-member-role">{member.role}</div>
          </div>
        ))}
      </div>
      <h2 className="about-subtitle">Sponsors</h2>
      <div className="about-sponsor-grid">
        {sponsors.map((s, i) => (
          <div className="about-card" key={s.name}>
            <div className="about-avatar">
              <img src={s.img} alt={s.alt} />
            </div>
            <div className="about-member-name">{s.name}</div>
          </div>
        ))}
      </div>
      <button className="about-back-btn" onClick={onBack}>Back</button>
    </div>
  </div>
);

export default About;