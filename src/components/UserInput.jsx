import React from 'react';

const UserInput = ({ userInput, setUserInput, disabled }) => {
  return (
    <input
      type="text"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}  // Update input value as the user types
      placeholder="Enter the code"
      disabled={disabled}  // Disable input based on the 'disabled' prop
    />
  );
};

export default UserInput;
