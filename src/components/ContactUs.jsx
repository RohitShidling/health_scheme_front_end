import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiBaseUrl = process.env.REACT_APP_API_URL || "https://health-schemes.vercel.app";

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Clear the error for the field being modified
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
    } else {
      try {
        setLoading(true);
        setErrors({});
        setSuccessMessage("Submitting your message...");

        const response = await axios.post(`${apiBaseUrl}/api/contact`, formData);

        if (response.status === 201) {
          setSuccessMessage(response.data.message);
          setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
          setErrors({ server: "Unexpected response from server." });
        }
      } catch (error) {
        console.error("Error:", error.response || error.message);
        setErrors({
          server: error.response?.data?.error || "Failed to submit your message. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (successMessage || errors.server) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrors({});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errors.server]);

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="form-section">
        <h2>Get in touch</h2>
        <p>Fill out the form below and we'll get back to you as soon as possible.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone (optional)</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className={errors.phone ? "input-error" : ""}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              className={errors.message ? "input-error" : ""}
            ></textarea>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.server && <p className="error-message">{errors.server}</p>}
      </div>

      <div className="other-contact">
        <h2>Other ways to reach us</h2>
        <p>
          Email: <a href="mailto:keltech.ac.in">keltech.ac.in</a>
        </p>
        <p>
          Phone: <a href="tel:+1211234567890">1234567-890</a>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
