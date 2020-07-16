import React, { Component } from "react";
import GetWPM from "./getWPM";
import TimeComponent from "./timeComponent";

class InputChecker extends Component {
  state = {
    typed: "",
    stringPos: 0,
    typedPos: 0,
    timeStarted: 0,
    keystrokes: 0,
    acc: 0,
    lastPrompt: "",
    getAcc: false,
    getWPM: false,
    getTime: false,
    timeTaken: null,
    wrongPos: null, //wrongPos represents when the wrong character starts. Its end will be event.target.value.length
  };

  handleChange = (event) => {
    this.setState({ typed: event.target.value });
    // Checking if input is correct
    if (
      this.props.prompt[0].charAt(this.state.stringPos) ===
      event.target.value.charAt(this.state.typedPos)
    ) {
      let stringPos = this.state.stringPos + 1;
      let typedPos = this.state.typedPos + 1;
      let keystrokes = this.state.keystrokes + 1;
      this.setState({
        stringPos,
        typedPos,
        keystrokes,
        wrongPos: null,
      });
    } else if (event.target.value.length < this.state.typedPos) {
      //Handles backspacing
      let stringPos = this.state.stringPos - 1;
      let typedPos = this.state.typedPos - 1;

      this.setState({
        stringPos,
        typedPos,
        wrongPos: null,
      });
    } else if (this.state.stringPos === this.props.prompt[0].length) {
      //----------------------- The prompt is completed. Calculating the WPM and such. Resetting state -------------------------------------//
      // console.log("Completed the prompt. Bring new prompt and calculate WPM");
      // console.log(this.props.prompt[0].length, " ", this.state.keystrokes);

      /* Calculating accuracy here because things get messy when passing the prompt as a prop to TimeComponent. The state and props
         update while the calculation is being made in the component. This also helps cut down on how many props has to be passed down
         to the time component */
      let lastPrompt = this.state.stringPos !== 0 ? this.props.prompt[0] : "";
      let acc =
        ((lastPrompt.length / this.state.keystrokes) * 100).toFixed(0) + "%";
      let timeTaken = new Date().getTime() - this.state.timeStarted;

      this.setState({
        stringPos: 0,
        typedPos: 0,
        keystrokes: 0,
        getWPM: true,
        getTime: true,
        getAcc: true,
        acc,
        lastPrompt,
        timeTaken,
        wrongPos: null,
      });
      this.props.onFinishedPrompt();
    } else {
      //Handles wrong input
      let wrongPos =
        this.state.stringPos +
        (event.target.value.length - this.state.typedPos);

      let keystrokes = this.state.keystrokes + 1;
      this.setState({ wrongPos, keystrokes });
    }
    //Clearing the green text if starting word over
    if (event.target.value === "") {
      let stringPos = this.state.stringPos - this.state.typedPos;
      let keystrokes = this.state.keystrokes + 1;
      this.setState({ typedPos: 0, stringPos, keystrokes });
    }
    //Checking for spaces after a word is typed correctly and resetting
    if (
      this.props.prompt[0].charAt(this.state.stringPos) === " " &&
      event.target.value.slice(-1) === " "
    ) {
      let stringPos = this.state.stringPos + 1;
      let keystrokes = this.state.keystrokes + 1;
      this.setState({ stringPos, keystrokes, typedPos: 0, typed: "" });
    }
    if (this.state.stringPos === 0) {
      //Starting time
      this.setState({
        timeStarted: new Date().getTime(),
        timeTaken: null,
      });
    }
  };

  initTextColor() {
    return this.state.stringPos === 0 ? "text-dark" : "text-success";
  }

  handleGetWPM = () => {
    this.setState({ getWPM: false });
  };

  handleGetTime = () => {
    this.setState({ getTime: false });
    // console.log("here");
  };

  handleGetAcc = () => {
    this.setState({ getAcc: false, keystrokes: 0 });
    console.log("here2!!!!!!!!!!!");
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Will fire when language is changed.
    // Might need to refactor because executing everytime input is taken
    if (prevProps.prompt[0] !== this.props.prompt[0]) {
      this.setState({
        typed: "",
        stringPos: 0,
        typedPos: 0,
        keystrokes: 0,
        getWPM: false,
        getTime: false,
        wrongPos: null,
      });
    }
    if (this.props.prompt[0] === this.state.lastPrompt) {
      // Edge case where if the prev and current prompt are the same, it will not reset the state
      this.props.onFinishedPrompt();
    }
  }
  render() {
    //console.log("Input checker rendered");
    const { stringPos, wrongPos, typed } = this.state;
    console.log(this.state.getAcc);
    return (
      <React.Fragment>
        <div className="grid-item grid-item-2">
          <div className="prompt">
            <span
              id="correctText"
              className={this.initTextColor()}
              style={{
                fontSize: 46,
                backgroundColor: "rgba(100, 239, 146, 0.32)",
              }}
            >
              {this.props.prompt[0].substring(0, stringPos)}
            </span>
            <span
              id="wrongText"
              style={{
                fontSize: 46,
                backgroundColor: "rgba(255, 42, 110, 0.39)",
              }}
              className="text-danger"
            >
              {this.state.wrongPos !== null
                ? this.props.prompt[0].substring(stringPos, wrongPos)
                : ""}
            </span>
            <span id="remaningText" style={{ fontSize: 46 }}>
              {wrongPos !== null
                ? this.props.prompt[0].substring(
                    wrongPos,
                    this.props.prompt[0].length
                  )
                : this.props.prompt[0].substring(
                    stringPos,
                    this.props.prompt[0].length
                  )}
            </span>
          </div>
          <input
            id="myInput"
            type="text"
            name="typed"
            value={typed}
            onInput={(e) => this.handleChange(e)}
          />
        </div>
        <GetWPM
          prompt={this.state.lastPrompt}
          timeTaken={this.state.timeTaken}
          getWPM={this.state.getWPM}
          onGetWPM={this.handleGetWPM}
        ></GetWPM>
        <TimeComponent
          timeTaken={this.state.timeTaken}
          acc={this.state.acc}
          getAcc={this.state.getAcc}
          getTime={this.state.getTime}
          onGetTime={this.handleGetTime}
        ></TimeComponent>
      </React.Fragment>
    );
  }
}
export default InputChecker;
