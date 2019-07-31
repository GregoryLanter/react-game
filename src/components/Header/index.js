import React from "react";
import "./style.css";


//the header we use props here to update teh response sending 
//game play messages to the user and to update score and top Score
function Header(props) {
  return (
    <header className="navbar">
      <h1 id="title">Krusty's Clown Memory</h1>
      <h1 id="response">{props.response}</h1>
      <h1 id="score">Score: {props.score} | Top Score {props.topScore}</h1>   
    </header>

  );
}

//export header
export default Header;
