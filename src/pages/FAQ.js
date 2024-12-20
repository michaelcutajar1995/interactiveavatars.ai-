import React, { useState } from 'react';
import styled from 'styled-components';


const FAQContainer = styled.div`
  margin: 2rem auto; /* Center the FAQ and adjust margin */
  padding: 1rem;
  background-color: #000;
  border-radius: 10px;
  max-width: 800px; /* Set a maximum width */
  width: 100%; /* Ensure it takes full width up to max-width */
`;

const Question = styled.h3`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const Answer = styled.p`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 1rem;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

function FAQ() {
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswerVisibility = (index) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <FAQContainer>
      {[ 
        { question: "What is Glimpse?", answer: "Glimpse is a platform that allows you to create and share interactive characters." },
        { question: "How do I create a character?", answer: "You can create a character by sending us an image and picking a voice." },
        { question: "Is there a cost involved?", answer: "Creating a character is free, but additional features may have costs." },
        { question: "Can I share my characters?", answer: "Yes, you can share your characters through links and QR codes." },
        { question: "What devices are supported?", answer: "Glimpse supports most modern smartphones and tablets." }
      ].map((item, index) => (
        <div key={index}>
          <Question onClick={() => toggleAnswerVisibility(index)}>
            {index + 1}. {item.question}
          </Question>
          <Answer isVisible={visibleAnswers[index]}>
            {item.answer}
          </Answer>
        </div>
      ))}
    </FAQContainer>
  );
}

export default FAQ; 