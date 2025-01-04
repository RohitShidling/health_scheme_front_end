import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/SchemesSection.css";
import { useNavigate } from 'react-router-dom';



const SchemesSection = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get("https://health-schemes.vercel.app/api/schemes");
        setSchemes(response.data);
      } catch (error) {
        console.error("Failed to fetch schemes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleClick = () => {
    navigate('/more-schemes'); // Navigate to the 'More Schemes' route
  };

  const healthschemes = () => {
    navigate('/more-schemes'); // Navigate to the 'More Schemes' route
  };


  return (
    <div className="schemes-container">
      <h2>Trending Health Schemes</h2>
      <div className="schemes-grid">
        {schemes.map((scheme, index) => (
          <div key={index} className="scheme-card">
            <div className="scheme-icon">{scheme.icon}</div>
            <h3>{scheme.title}</h3>
            <p>{scheme.description}</p>
            <button onClick={healthschemes}>Learn More</button>
          </div>
        ))}
      </div>
      <div className="schemes-grid">
          <div className="scheme-card">
            <div className="scheme-icon"></div>
            
            <button onClick={handleClick}><h2 style={{transform: 'translateY(10px)'}}>More Schemes</h2> </button>
          </div>
      </div>
    </div>
  );
};

export default SchemesSection;
