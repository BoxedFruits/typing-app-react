import React, { Component } from "react";

class TimeComponent extends Component {
  state = {
    timeString: "",
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

  render() {
    return (
      <div className="grid-item grid-item-4">
        <div id="accTime">
          <h1 id="accuracy">
            Accuracy: {this.props.getAcc !== false ? this.props.acc : ""}
          </h1>
          <h1 id="time">
            Time:{" "}
            {this.props.getTime !== false
              ? (this.props.onGetTime(), this.calculateTime())
              : this.state.timeString}
          </h1>
        </div>
      </div>
    );
  }
}

export default TimeComponent;
