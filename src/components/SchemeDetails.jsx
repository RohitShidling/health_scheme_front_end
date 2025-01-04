import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/SchemeDetails.css";

const SchemeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("Indian");
  const [income, setIncome] = useState("");
  const [rationCard, setRationCard] = useState("");
  const [isEligible, setIsEligible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // Track if form has been submitted
  const [rationCardError, setRationCardError] = useState(""); // Track ration card validation error

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const response = await axios.get(`https://health-schemes.vercel.app/api/health-schemes/${id}`);
        setScheme(response.data);
      } catch (err) {
        setError("Failed to load scheme details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchemeDetails();
  }, [id]);

  const validateEligibility = () => {
    setFormSubmitted(true); // Mark the form as submitted

    if (rationCard.trim().length !== 10) {
      setRationCardError("Ration card number must be 10 digits.");
      return;
    } else {
      setRationCardError("");
    }

    if (
      parseInt(age, 10) > 18 &&
      nationality.toLowerCase() === "indian" &&
      parseFloat(income) <= 50000 &&
      rationCard.trim().length === 10
    ) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="scheme-details">
      <button className="back-button" onClick={() => navigate("/more-schemes")}>
        Back to Schemes
      </button>
      <div className="scheme-container">
        {/* Scheme Details */}
        <div className="scheme-info">
          <h1>{scheme.title}</h1>
          <p>{scheme.description}</p>
          <h3>Benefits</h3>
          <p>{scheme.benefits.replace(/₹(\d+)(\d{3})/, "₹$1,$2")}</p>
          <h3>Eligibility</h3>
          <p className="eligibility-text">{scheme.eligibility}</p>
          <h3>Required Documents</h3>
          <ul>
            {scheme.requiredDocuments.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
          <h3>Application Steps</h3>
          <p>{scheme.applicationSteps}</p>
          <h3>Provider</h3>
          <p>{scheme.provider}</p>
        </div>

        {/* Eligibility Form */}
        <div className="eligibility-form">
          <h2>Check Your Eligibility</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validateEligibility();
            }}
          >
            <label>
              Age:
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>
            <label>
              Nationality:
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              >
                <option value="Indian">Indian</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
              </select>
            </label>
            <label>
              Income (₹):
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
              />
            </label>
            <label>
              Ration Card Number:
              <input
                type="text"
                value={rationCard}
                onChange={(e) => setRationCard(e.target.value)}
                required
              />
            </label>
            {rationCardError && <p className="error-message">{rationCardError}</p>}
            <button type="submit" className="check-button">
              Check Eligibility
            </button>
          </form>
          {formSubmitted && (
            isEligible ? (
              <p className="success-message">You are eligible for this scheme!</p>
            ) : (
              <p className="error-message">You are not eligible yet. Please check your inputs.</p>
            )
          )}
          <div className="apply-button-container">
            <a
              href={scheme.applicationWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className={`apply-button ${isEligible ? "" : "disabled"}`}
              onClick={(e) => {
                if (!isEligible) e.preventDefault();
              }}
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
