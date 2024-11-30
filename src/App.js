import React, { useState } from "react";

const HealthSchemesPortal = () => {
  const [schemes] = useState([
    {
      id: 1,
      name: "Chiranjeevi Yojana",
      description: " The scheme of the state government of Gujarat was launched in 2006 as a public–private partnership designed to increase institutional delivery rates.",
      eligibility: { age: 18, income: 50000 },
      benefits:"The beneficiaries are provided financial protection by covering their out-ofpocket costs incurred on travel to reach the healthcare facility. The scheme also provides financial support to the accompanying person for loss of wages. The benefits of the package also include free food and medicines after delivery for the woman and reimbursement of transport cost of Rs. 50 for accompanying members of the family.",
      documents: ["ID Proof", "Income Certificate"],
      website: "https://scheme-a.example.com",
    },-
    {
      id: 2,
      name: "Scheme B",
      description: "Covers medical expenses for senior citizens.",
      eligibility: { age: 60, income: 30000 },
      documents: ["ID Proof", "Age Proof"],
      website: "https://scheme-b.example.com",
    },
  ]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [eligibilityCheck, setEligibilityCheck] = useState({ age: "", income: "" });

  const handleBack = () => setSelectedScheme(null);

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <button
          onClick={() => (selectedScheme ? handleBack() : window.history.back())}
          style={styles.navButton}
        >
          Back
        </button>
        <button style={styles.navButton}>List of Hospitals</button>
        <button style={styles.navButton}>Locate Nearest Hospital</button>
        <button style={styles.navButton}>About Us</button>
        <button style={styles.navButton}>Contact & Support</button>
        <select style={styles.languageSelect}>
          <option>English</option>
          <option>kannada</option>
        </select>
      </nav>

      {/* Main Content */}
      <div style={styles.main}>
        <h1 style={styles.title}>Health Schemes Portal</h1>

        {/* Schemes Table */}
        {!selectedScheme ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map((scheme) => (
                <tr key={scheme.id}>
                  <td
                    style={styles.schemeName}
                    onClick={() => setSelectedScheme(scheme)}
                  >
                    {scheme.name}
                  </td>
                  <td>{scheme.description}</td>
                  <td>
                    <button style={styles.knowMoreButton} onClick={() => setSelectedScheme(scheme)}>
                      Know More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={styles.detailsPanel}>
            <h2>{selectedScheme.name}</h2>
            <p>{selectedScheme.description}</p>
            <h3>Eligibility Criteria</h3>
            <ul>
              <li>Age: {selectedScheme.eligibility.age} or older</li>
              <li>Income: Less than {selectedScheme.eligibility.income}</li>
            </ul>
            <h3>Required Documents</h3>
            <ul>
              {selectedScheme.documents.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>

            {/* Eligibility Checker */}
            <h3>Check Your Eligibility</h3>
            <label>
              Age:
              <input
                type="number"
                value={eligibilityCheck.age}
                onChange={(e) => setEligibilityCheck({ ...eligibilityCheck, age: e.target.value })}
                style={styles.input}
              />
            </label>
            <label>
              Income:
              <input
                type="number"
                value={eligibilityCheck.income}
                onChange={(e) => setEligibilityCheck({ ...eligibilityCheck, income: e.target.value })}
                style={styles.input}
              />
            </label>
            <button
              style={styles.checkButton}
              onClick={() => {
                const isEligible =
                  eligibilityCheck.age >= selectedScheme.eligibility.age &&
                  eligibilityCheck.income <= selectedScheme.eligibility.income;
                alert(isEligible ? "You are eligible for this scheme!" : "You are not eligible.");
              }}
            >
              Check Eligibility
            </button>

            <p>
              <a href={selectedScheme.website} target="_blank" rel="noopener noreferrer" style={styles.link}>
                Visit Official Website
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


// Styles
const styles = {
  container: { fontFamily: "'Roboto', sans-serif", padding: "1em", backgroundColor: "#f9f9f9" },
  navbar: { display: "flex", justifyContent: "space-between", marginBottom: "1em", backgroundColor: "#3b5998", padding: "1em" },
  navButton: { padding: "0.5em 1em", color: "#fff", backgroundColor: "#007BFF", border: "none", borderRadius: "4px", cursor: "pointer" },
  languageSelect: { padding: "0.5em" },
  main: { textAlign: "center", color: "#333" },
  title: { marginBottom: "1em", color: "#0056b3" },   
  table: { margin: "0 auto", borderCollapse: "collapse", width: "80%", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
  schemeName: { cursor: "pointer", color: "#007BFF", textDecoration: "underline" },
  knowMoreButton: { padding: "0.5em 1em", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  detailsPanel: { marginTop: "1em", textAlign: "left", padding: "1em", border: "1px solid #ccc", width: "60%", margin: "1em auto", backgroundColor: "#fff" },
  input: { margin: "0.5em 0", padding: "0.5em", width: "100%", border: "1px solid #ccc", borderRadius: "4px" },
  checkButton: { padding: "0.5em 1em", cursor: "pointer", backgroundColor: "#17a2b8", color: "#fff", border: "none", borderRadius: "4px", marginTop: "1em" },
  link: { color: "#0056b3", textDecoration: "none", fontWeight: "bold" },
};

export default HealthSchemesPortal;