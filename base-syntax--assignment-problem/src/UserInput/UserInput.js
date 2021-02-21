import React from 'react';
import './UserInput.css';

const userInput = (props) => {
    
return (
    <div className="UserInput">
        <h1>INPUT USER</h1>
        <p>Insert Name:</p>
        <input type="text" onChange={props.changed}  value={props.currentName}></input>               
    </div> 
);

};

export default userInput;