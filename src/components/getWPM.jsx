import React, { Component } from "react";

//This can probably stateless
class GetWPM extends Component {
  state = { currentWPM: 0 };
  calculateWPM = () => {
    let wordCount = this.props.prompt.split(" ").length;
    let timeTaken = this.props.timeTaken; //This is in ms
    var minutes = Math.floor(timeTaken / 60000);
    var seconds = ((timeTaken % 60000) / 1000).toFixed(0);
    console.log(
      "Time taken is : ",
      minutes,
      " ",
      seconds,
      " ",
      seconds / 60,
      " ",
      wordCount
    );
    console.log(this.props.prompt, " ", wordCount, " ");
    // console.log("getting WPM ", wordCount / (minutes + seconds/60));
    this.setState({
      currentWPM: Math.floor(wordCount / (minutes + seconds / 60)),
    });
    this.props.onGetWPM();
    return wordCount / (minutes + seconds / 60);
    // This gives an warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
  };

  render() {
    return (
      <div className="grid-item grid-item-3">
        <h1 id="wpm">
          WPM:{" "}
          {this.props.getWPM !== false
            ? this.calculateWPM()
            : this.state.currentWPM}
        </h1>
      </div>
    );
  }
}

export default GetWPM;
