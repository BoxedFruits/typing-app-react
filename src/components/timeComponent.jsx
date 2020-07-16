import React, { Component } from "react";

class TimeComponent extends Component {
  state = {
    timeString: "",
    accString: "",
    promptLength: this.props.promptLength,
  };

  calculateTime = () => {
    let timeTaken = this.props.timeTaken; //This is in ms
    console.log(timeTaken, " time taken calculate time");
    var minutes = Math.floor(timeTaken / 60000);
    var seconds = ((timeTaken % 60000) / 1000).toFixed(0);
    let timeString =
      (minutes === 0 ? "00:" : minutes.toString() + ":") +
      (seconds < 10 ? "0" + seconds : seconds);
    // console.log(timeString);
    this.setState({
      timeString,
    });
  };

  calculateAcc = () => {
    let accString =
      ((this.state.promptLength / this.props.keystrokes) * 100).toFixed(0) +
      "%";
    this.setState({
      accString,
    });
    console.log((this.props.promptLength / this.props.keystrokes) * 100);
    console.log(this.props.promptLength + " / " + this.props.keystrokes);
  };
  // not conditinoally rendering is proba the cause
  render() {
    return (
      <div className="grid-item grid-item-4">
        <h1 className="accuracy">
          Accuracy: {this.props.getAcc !== false ? this.props.acc : ""}
        </h1>
        <h1 className="time">
          Time:{" "}
          {this.props.getTime !== false
            ? (this.props.onGetTime(), this.calculateTime())
            : this.state.timeString}
        </h1>
      </div>
    );
  }
}

export default TimeComponent;
