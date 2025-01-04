import React from "react";
import "../styles/List.css";

function List() {
  return (
    <div className="main-container">
      <div className="content">
        {/* Health Schemes Section */}
        <section className="health-schemes">
          <h2>Available Health Schemes</h2>
          <div className="schemes-grid">
            <div className="scheme-card">
              <h3>
                <span className="icon">👶</span> Maternity Care Plus
              </h3>
              <p>
                Comprehensive care for expecting mothers including regular
                check-ups and delivery coverage
              </p>
              <button>Learn More</button>
            </div>

            <div className="scheme-card">
              <h3>
                <span className="icon">💖</span> Women's Wellness Program
              </h3>
              <p>
                Regular health screenings and preventive care for women of all
                ages
              </p>
              <button>Learn More</button>
            </div>

            <div className="scheme-card">
              <h3>
                <span className="icon">🛡️</span> Cancer Care Coverage
              </h3>
              <p>
                Early detection and treatment coverage for various types of
                cancer
              </p>
              <button>Learn More</button>
            </div>

            <div className="scheme-card">
              <h3>
                <span className="icon">👩‍🦳</span> Senior Women's Health
              </h3>
              <p>
                Specialized healthcare coverage for women above 60 years
              </p>
              <button>Learn More</button>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <aside className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <span className="icon">📈</span> Trending Schemes
              <p>Most popular health schemes</p>
            </li>
            <li>
              <span className="icon">📄</span> Government Resources
              <p>Official healthcare documents</p>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default List;
