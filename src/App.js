  import React, { Component } from "react";
  import Header from "./components/Header";
  
  import './App.css';
  import FriendCard from "./components/FriendCard";
  import Wrapper from "./components/Wrapper";
  import krustyPals from "./krustyPals.json"
  
  class App extends Component {
  
    // set up state we use a function to initialize state 
    //this way we can call it later when the user wants to reset the game
    //response is used to show messages tot he user
    //score is current score in the game
    //topScore is teh best score this session
    //krustypals is a clean object of images used in the app
    //display is an obect built by randomly grabbing images from krusty pals
    //        this is done to randomize the images on the screen
    //clicked this is used to keep track of which images have been clicked
    //         WARNING!!!! the index for this array should be based on krustypalsID - 1
    //         if you use the position in display it will not be correct
    //play this is of the game wether you are currently playing or the game is over
    state = this.initialState;
    get initialState() {
      return {
        response: "Click an image below to begin!",
        score: 0,
        topScore: 0,
        krustyPals: krustyPals,
        display: krustyPals,
        clicked: ["Not Clicked", "Not Clicked", "Not Clicked", "Not Clicked", "Not Clicked", "Not Clicked", "Not Clicked", "Not Clicked", "Not Clicked", "Not Clicked", "Not Clicked", "Not Clicked"],
        play: "Playing"
      }
    }
  
    //reset State at the start of a game
    resetBuilder() {
      this.setState(this.initialState);
    }
  
  
    //set the score after a click event
    setScore = (clicked) => {
      //if you are not in the not playing state and there is a click 
      //restart the game
      if (this.state.play !== "Playing") {
        //save the topscore
        let tempTopScore = this.state.topScore;
        //reset the state
        this.resetBuilder();
        //      this.resetClicked();
        //reset the topscore we saved because resetting state set it to 0
        this.setState({ topScore: tempTopScore, response: "Click an image to begin!" });
      } else {
        //if we are the middle of a game i.e. play = play
        //see if the click was on an image that has been clicked
        if (this.state.clicked[clicked - 1] === "Clicked") {
          // second click for an image game over
          this.setState({ response: "Sorry No, Gave Over!" })
          this.setState({ play: "Over" })
        } else {
          //first click game still going
          //create a copy of krustypals to work with
          // and a new verison of the clicked array
          let newPalObj = this.state.krustyPals;
          let newClickedArr = this.state.clicked;

          // update the object and the clicked array
          for (let pal = 0; pal < 12; pal++) {
            if (pal === (clicked - 1)) {
              //this is the object that was clicked
              newPalObj[pal].clicked = "Clicked";
              newClickedArr[pal] = "Clicked"
            } else {
              // this object was not clicked so maintain the state it had before the event
              newPalObj[pal].clicked = this.state.clicked[newPalObj[pal].id - 1];
            }
          }
          //update state with the new objects
          this.setState({ display: newPalObj });
          this.setState({ clicked: newClickedArr });
  
          //update the score
          this.setState({ score: this.state.score + 1 }, () => {
            //check to see if we have a new high score 
            //if we do update top score
            if (this.state.score >= this.state.topScore) {
              this.setState({ topScore: this.state.score }, () => {
                //if the user get all 12 images they win!
                if(this.state.score === 12){
                  console.log("Winner");
                  this.setState({response: "YOU WIN!!!"}, () => {
                    this.setState({play: "Over"});
                  });
                }
              });
            }
            //let the use know they got one right
            this.setState({ response: "CORRECT!!! Keep guessing" });
          });


          //randomize
          //set variables we will use
          let newDisplay = [];
          let used = [];
          let newPosi = -1;
          //while used length is less than the total number of images
          while (used.length < this.state.display.length) {
            //get a new number between 0 and 11 (array index range for krustyPals)
            // might be better to use krustypals.length-1 that way if the size
            // of the array changes we do not have to update the code.
            newPosi = Math.floor(Math.random() * 11);
            //check to see if our random number has been used
            // if it has add one to it until we hit a value that has not been used.
            while (used.indexOf(newPosi) !== -1) {
              newPosi++;
              // check to make sure we reset at the end of the array
              if (newPosi > 11) newPosi = 0;
            }
            //update the newDisplay array and the used array
            newDisplay.push(this.state.display[newPosi]);
            used.push(newPosi);
          }
          //update state with the object we just created.
          this.setState({ display: newDisplay });
        }
      }
    }
  
  
    render() {
      return (
        <Wrapper>
          <Header response={this.state.response} score={this.state.score} topScore={this.state.topScore} />
          {this.state.display.map(pal => (
            <FriendCard
              setScoreCallBack={this.setScore}
              image={pal.image}
              clicked={pal.clicked}
              id={pal.id}
              name={pal.name}
            />
          ))}
        </Wrapper>
      );
    }
  }
  
  export default App;
  
