import React, { useState, useEffect } from 'react';
import UserInput from './UserInput';  // Importing the UserInput component
import '../index.css'; // Importing the CSS styles

const App = () => {
  const [level, setLevel] = useState(1);  // Starting at level 1
  const [code, setCode] = useState('');  // Empty code to be filled
  const [userInput, setUserInput] = useState('');  // Input from user
  const [timer, setTimer] = useState(5);  // Timer starts at 5 seconds
  const [gameStatus, setGameStatus] = useState('ongoing');  // Game status: ongoing, won, lost
  const [isCodeVisible, setIsCodeVisible] = useState(true);  // Whether to show the code or not
  const [isInputDisabled, setIsInputDisabled] = useState(true); // Disable input until timer ends
  const [isInputVisible, setIsInputVisible] = useState(false); // Hide input initially

  // Function to generate a random code of a certain length based on the level
  const generateCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';  // Allowed characters for the code
    let code = '';
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  // Start the game when the component mounts
  useEffect(() => {
    const newCode = generateCode(level + 4);  // Generate a code based on the current level
    setCode(newCode);

    // Start the initial 5-second timer countdown
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerInterval);  // Stop the timer when it hits 0
          setIsCodeVisible(false);  // Hide the code after the timer is up
          setIsInputDisabled(false);  // Enable input after the timer ends
          setIsInputVisible(true);  // Show the input field after the timer ends
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000); // Decrease the timer every second

    return () => clearInterval(timerInterval);  // Cleanup the interval when component unmounts
  }, [level]);

  // Function to check if the user input is correct
  const checkInput = () => {
    if (userInput === code) {
      // User passed the level, go to the next level
      if (level === 5) {
        setGameStatus('won');  // Player won after level 5
      } else {
        setLevel(level + 1);  // Move to the next level
        setUserInput('');  // Reset the input field
        setIsCodeVisible(true);  // Show code again for next level
        setTimer(5); // Reset the initial timer to 5 seconds
        setIsInputDisabled(true); // Disable input again for the next level
        setIsInputVisible(false); // Hide input until the timer ends again
      }
    } else {
      setGameStatus('lost');  // User lost, reset the game
    }
  };

  // Function to handle input change in the UserInput component
  const handleInputChange = (input) => {
    setUserInput(input);
  };

  return (
    <div className="game-container">
      <h1>Memory Game - Level {level}</h1>
      <p className="level">Level: {level}</p>
      <p className="time">Time Left: {timer}s</p>

      {/* Show the code during the first 5 seconds of the game */}
      {isCodeVisible && <p className="code">Code: {code}</p>}

      {/* Show the input field only after the timer finishes */}
      {isInputVisible && (
        <>
          <UserInput 
            userInput={userInput} 
            setUserInput={handleInputChange} 
            disabled={isInputDisabled} 
          />
          <button onClick={checkInput} disabled={isInputDisabled}>Submit</button>
        </>
      )}

      {gameStatus === 'won' && <p className="status-message" style={{color: 'green'}}>You won the game!</p>}
      {gameStatus === 'lost' && <p className="status-message" style={{color: 'red'}}>Game Over! Try again.</p>}
    </div>
  );
};

export default App;
