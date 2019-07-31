import React from "react";
import "./style.css";


class FriendCard extends React.Component {
  //react component that has the images in it.
  // it will also have the ID and the clicked value but they are hidden from the user
  handleScore = () => {
    //this is a callback function in the state we are calling to update the score
    this.props.setScoreCallBack(this.props.id);
  }

  //render the HTML
  //here we use props to set the image, image alt id, id and clicked vlaue
  render() {
    return (
      <div className="card" onClick={this.handleScore}>
        <div className="img-container">
          <img src={this.props.image} alt={this.props.name}/>
          <p>{this.props.id} - {this.props.clicked}</p>
        </div>
      </div>
    );
  }
}

//export the card to use in the app
export default FriendCard;
