// Here we are going to setup timer , first Timer then UserInput -
// then go for input 
// then import them into game 
// would recive {timer} as a prop 


import React  from "react";
const Timer = ({timer}) => {
    return <>
        Time Remaining : {timer}s 
    </>
}
export default Timer;

