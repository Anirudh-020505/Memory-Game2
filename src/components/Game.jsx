import React,{useState,useEffect} from 'react';
import UserInput from './UserInput';
import '../index.css';
const App=()=>{
const [level,setLevel]=useState(1);
const [code,setCode]=useState('');
const [userInput,setUserInput]=useState('');
const [timer,setTimer]=useState(5);
const [gameStatus,setGameStatus]=useState('ongoing');
const [isCodeVisible,setIsCodeVisible]=useState(true);
const [isInputDisabled,setIsInputDisabled]=useState(true);
const generateCode=(length)=>{
const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let code='';
for(let i=0;i<length;i++){
code+=characters.charAt(Math.floor(Math.random()*characters.length));
}
return code;
};
useEffect(()=>{
const newCode=generateCode(level+4);
setCode(newCode);
const timerInterval=setInterval(()=>{
setTimer((prevTimer)=>{
if(prevTimer<=1){
clearInterval(timerInterval);
setIsCodeVisible(false);
setIsInputDisabled(false);
return 0;
}
return prevTimer-1;
});
},1000);
return()=>clearInterval(timerInterval);
},[level]);
const checkInput=()=>{
if(userInput===code){
if(level===5){
setGameStatus('won');
}else{
setLevel(level+1);
setUserInput('');
setIsCodeVisible(true);
setTimer(5);
setIsInputDisabled(true);
}
}else{
setGameStatus('lost');
}
};
const handleInputChange=(input)=>{
setUserInput(input);
};
return(
<div className="game-container">
<h1>Memory Game - Level {level}</h1>
<p className="level">Level: {level}</p>
<p className="time">Time Left: {timer}s</p>
{isCodeVisible&&<p className="code">Code: {code}</p>}
<UserInput userInput={userInput} setUserInput={handleInputChange} disabled={isInputDisabled}/>
<button onClick={checkInput} disabled={isInputDisabled}>Submit</button>
{gameStatus==='won'&&<p className="status-message" style={{color:'green'}}>You won the game!</p>}
{gameStatus==='lost'&&<p className="status-message" style={{color:'red'}}>Game Over! Try again.</p>}
</div>
);
};
export default App;
