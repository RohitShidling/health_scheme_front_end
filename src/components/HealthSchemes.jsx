import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/HealthSchemes.css";

const HealthSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get("https://health-schemes.vercel.app/api/health-schemes");
        setSchemes(response.data);
      } catch (err) {
        setError("Failed to load health schemes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const handleLearnMore = (id) => {
    navigate(`/health-schemes/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="health-schemes">
      <h1 id="health">Health Schemes</h1>
      <div className="schemes-grid">
        {schemes.map((scheme) => (
          <div key={scheme._id} className="scheme-card">
            <h2>{scheme.title}</h2>
            <p>{scheme.description}</p>
            <button onClick={() => handleLearnMore(scheme._id)}>Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthSchemes;
