import React, { useState, useEffect } from "react";
import "../styles/HeroSection.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeroSection = () => {
  const images = [
    "/images/women1.png",
    "/images/women2.png",
    "/images/women3.png",
    "/images/women4.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      setSearchResults([]);
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://health-schemes.vercel.app/api/health-schemes?search=${query}`
      );
      setSearchResults(response.data); // Update search results
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 404) {
        setSearchResults([]);
        setError("No schemes found.");
      } else {
        setError("Error fetching search results.");
      }
    }
  };

  const handleSearch = () => {
    fetchSearchResults(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSchemeClick = (id) => {
    navigate(`/health-schemes/${id}`);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="hero-container">
      <div className="search-bar" style={{ borderRadius: "20px" }}>
        <input
          type="text"
          placeholder="Search health schemes"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            fetchSearchResults(e.target.value); // Trigger search on input change
            setError(""); // Clear error when user starts typing
          }}
          onKeyPress={handleKeyPress} // Search on Enter key press
        />
        <button onClick={handleSearch}>Search</button>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="search-results">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          searchResults.map((scheme) => (
            <div
              key={scheme._id}
              className="search-result-item"
              onClick={() => handleSchemeClick(scheme._id)}
            >
              {scheme.title}
            </div>
          ))
        )}
      </div>

      <div className="slider">
        <div
          className="slider-images"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index + 1}`} />
          ))}
        </div>
        <button className="slider-button left" onClick={goToPrevious}>
          &#8249;
        </button>
        <button className="slider-button right" onClick={goToNext}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
