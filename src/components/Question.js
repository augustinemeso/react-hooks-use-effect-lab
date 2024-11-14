import React, { useEffect, useState } from 'react';

const Question = ({ question, onAnswered }) => {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    // Call onAnswered after 10 seconds
    const timeout = setTimeout(() => {
      onAnswered(false);
    }, 10000);

    // Cleanup the timeout and interval on unmount
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [onAnswered]);

  return (
    <div>
      <p>{timeRemaining} seconds remaining</p>
      <p>{question.prompt}</p>
      {/* Render other parts of the question (answers, etc.) */}
    </div>
  );
};

export default Question;
