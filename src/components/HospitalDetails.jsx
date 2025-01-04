import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const HospitalDetails = ({ hospitals }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hospital = hospitals.find((h) => h.id === id);

  if (!hospital) {
    return <div>Hospital not found!</div>;
  }

  return (
    <div className="hospital-details">
      <h2>{hospital.name}</h2>
      <p><strong>Address:</strong> {hospital.address}</p>
      <a href={hospital.link} target="_blank" rel="noopener noreferrer">
        Get Directions
      </a>
      <br />
      <button onClick={() => navigate("/")}>Back to List</button>
    </div>
  );
};

export default HospitalDetails;
