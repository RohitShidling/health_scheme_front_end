import React, { useState } from "react";
import SearchBar from "./SearchBar";
import FAQItem from "./FAQItem";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const faqs = [
    {
      question: "How do I check my eligibility for a scheme?",
      answer:
        "To check your eligibility, visit the specific scheme's page and use the eligibility checker tool. You'll need to provide some basic information such as your age, income, and location.",
    },
    {
      question: "What documents do I need to apply?",
      answer: "You will need identity proof, income certificate, and address proof.",
    },
    {
      question: "Are these schemes available for all income groups?",
      answer: "Some schemes are income-specific, while others are universal.",
    },
    {
      question: "How do I find the nearest hospital offering these services?",
      answer: "You can use the locator tool on the scheme's website to find nearby hospitals.",
    },
    {
      question: "How long does the application process take?",
      answer: "The process usually takes 2-4 weeks, depending on the scheme.",
    },
  ];

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="faq-container" >
      <h1 style={{marginBottom:"15px"}}>Frequently Asked Questions</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
  <SearchBar 
    onSearch={setSearchQuery} 
  />
</div>
      <div className="faq-items" style={{marginTop:'80px'}}>
        {filteredFAQs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
