import React, { useState } from "react";
import "../styles/FAQItem.css";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="main">

    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span className="toggle-icon">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
    </div>
  );
};

export default FAQItem;
