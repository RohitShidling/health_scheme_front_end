import React, { useState, useEffect } from "react";
import "../styles/Hospital.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faFile,
  faBuilding,
  faStethoscope,
  faDroplet,
  faVirus,
} from "@fortawesome/free-solid-svg-icons";

const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedOwnership, setSelectedOwnership] = useState("");
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await fetch("https://health-schemes.vercel.app/api/hospitals");
      const data = await response.json();
      console.log(data); // Debugging: verify fetched data
      setHospitals(data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      // Update areas based on selected city
      const cityAreas = hospitals
        .filter((hospital) => hospital.city === selectedCity)
        .map((hospital) => hospital.area);
      setAreas([...new Set(cityAreas)]); // Remove duplicates
    } else {
      setAreas([]);
    }
  }, [selectedCity, hospitals]);

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity ? hospital.city === selectedCity : true;
    const matchesArea = selectedArea ? hospital.area === selectedArea : true;
    const matchesOwnership = selectedOwnership
      ? hospital.ownership === selectedOwnership
      : true;
    return matchesSearch && matchesCity && matchesArea && matchesOwnership;
  });

  return (
    <div className="hospital-container">
      <h1 className="title">Hospital Directory</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by hospital name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <select
          className="filter-dropdown"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setSelectedArea(""); // Reset area selection
          }}
        >
          <option value="">Select City</option>
          {[...new Set(hospitals.map((hospital) => hospital.city))].map(
            (city, index) => (
              <option value={city} key={index}>
                {city}
              </option>
            )
          )}
        </select>

        <select
          className="filter-dropdown"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          disabled={!selectedCity}
        >
          <option value="">Select Area</option>
          {areas.map((area, index) => (
            <option value={area} key={index}>
              {area}
            </option>
          ))}
        </select>

        <select
          className="filter-dropdown"
          value={selectedOwnership}
          onChange={(e) => setSelectedOwnership(e.target.value)}
        >
          <option value="">Select Ownership</option>
          {[...new Set(hospitals.map((hospital) => hospital.ownership))].map(
            (ownership, index) => (
              <option value={ownership} key={index}>
                {ownership}
              </option>
            )
          )}
        </select>
      </div>

      {/* Hospital Cards */}
      <div className="hospital-cards">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital, index) => (
            <div className="hospital-card" key={index}>
              <div className="hospital-header">
                <h2>{hospital.name}</h2>
                <span className="min-price">
                  Min: ₹{hospital.charges?.OPD ?? "Not Available"}
                </span>
              </div>
              <p className="location">
                <FontAwesomeIcon icon={faLocationDot} /> {hospital.location}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faStethoscope} /> OPD Charges:
                </strong>{" "}
                ₹{hospital.charges?.OPD ?? "Not Available"}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faDroplet} /> Blood Test Charges:
                </strong>{" "}
                ₹{hospital.charges?.blood_test ?? "Not Available"}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faVirus} /> Operation Charges:
                </strong>{" "}
                {hospital.charges?.operation ?? "Not Available"}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faBuilding} /> Ownership:
                </strong>{" "}
                {hospital.ownership ?? "Not Available"}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faFile} /> Health Schemes:
                </strong>{" "}
                {hospital.health_schemes?.join(", ") ?? "Not Available"}
              </p>
            </div>
          ))
        ) : (
          <p className="no-results">No hospitals found</p>
        )}
      </div>
    </div>
  );
};

export default Hospital;
