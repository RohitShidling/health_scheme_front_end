import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import SchemesSection from "./components/SchemesSection";
import QuickLinks from "./components/QuickLinks";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import HealthSchemes from "./components/HealthSchemes";
import SchemeDetails from "./components/SchemeDetails";
import Hospitals from "./components/Hospitals";
import NearestHospital from "./components/NearestHospital";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main>
          <Routes>
            {/* Redirect root to /schemes */}
            <Route path="/" element={<Navigate to="/schemes" replace />} />

            {/* Schemes Page */}
            <Route
              path="/schemes"
              element={
                <>
                  <HeroSection />
                  <div className="main-content">
                    <SchemesSection />
                    <QuickLinks />
                  </div>
                </>
              }
            />

            {/* All Schemes */}
            <Route path="/more-schemes" element={<HealthSchemes />} />
            {/* Dynamic Scheme Details */}
            <Route path="/health-schemes/:id" element={<SchemeDetails />} />

            {/* Nearest Hospital */}
            <Route path="/nearest-hospital" element={<NearestHospital />} />

            {/* Contact Us */}
            <Route path="/contact-us" element={<ContactUs />} />

            {/* FAQ */}
            <Route path="/faq" element={<FAQ />} />

            {/* Hospitals */}
            <Route path="/hospitals" element={<Hospitals />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
