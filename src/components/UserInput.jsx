import React from 'react';

const UserInput = ({ userInput, setUserInput }) => {
  return (
    <input
      type="text"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}  // Update input value as the user types
      placeholder="Enter the code"
    />
  );
};

export default UserInput;
