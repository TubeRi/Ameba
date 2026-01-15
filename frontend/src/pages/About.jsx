import React from "react";
import "./About.css";

const team = [
  { name: "Julius", role: "Fullstack" },
  { name: "Could be you", role: "Apply NOW" },
  { name: "Could be you", role: "Apply NOW" },
  { name: "Could be you", role: "Apply NOW" },
];

const sponsors = [
  { name: "Could be your sponsor", img: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png", alt: "Sponsor" },
];

const About = () => (
  <div className="about-bg">
    <div className="about-container">
      <h1 className="about-title">About <span>AMEBA</span></h1>
      <p className="about-desc">
        AMEBA is a platform for gamers around the globe to discover new games and buy them for the most affordable prices in the market
      </p>
      <h2 className="about-subtitle">Our team</h2>

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
    </div>
  </div>
);

export default About;