import React, { Component } from "react";
import "./App.css";
import InputChecker from "./components/inputChecker";
import LanguageSelector from "./components/languageSelector";
import ModeSelector from "./components/modeSelector";
import ResetButton from "./components/resetButton";
import styled from "styled-components";
import sentencePrompts from "./prompts/sentencePrompts.json";
import paragraphPrompts from "./prompts/paragraphPrompts.json"; //Need to get prompts for paragraphs

class App extends Component {
  state = {
    language: "english",
    prompt: ["Place holder prompt", "Me"],
    mode: "sentence",
    getPrompt: false,
  };

  handleLanguage = (language) => {
    this.setState({ language }, () => {
      this.generatePrompt();
    });
  };

  generatePrompt = () => {
    let mode;
    if (this.state.mode === "sentence") {
      mode = sentencePrompts;
    } else if (this.state.mode === "paragraph") {
      mode = paragraphPrompts;
    }

    const language = this.state.language;

    let max = mode[language].length;
    let min = 0;
    var randIndex = Math.floor(Math.random() * (max - min)) + min;

    this.setState({ prompt: mode[language][randIndex] });
    document.getElementById("myInput").focus();
    console.log(mode[language][randIndex]); // Prompts will repeaet
  };

  handleMode = (mode) => {
    this.setState({ mode }, () => {
      this.generatePrompt();
      //console.log(mode + " <-- mode", this.state.mode);
    });
  };

  func() {
    console.log("function");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.prompt[0] === prevState.prompt[0]) {
      // Edge case where if the prev and current prompt are the same, it will not reset the state
      console.log("repeated a prompt");
      console.log(this.state.prompt[0], " ", prevState.prompt[0]);
      this.generatePrompt();
    }
  }

  componentDidMount() {
    this.generatePrompt();
    console.log(this.state.prompt);
  }

  resetPrompt = (event) => {
    //resets prompt if Escape is pressed
    if (event.keyCode === 27) {
      console.log("pog");
      this.generatePrompt();
    }
  };

  render() {
    return (
      <div className="App" onKeyDown={(event) => this.resetPrompt(event)}>
        <ResetButton onResetPrompt={this.generatePrompt}></ResetButton>
        <div className="grid-container">
          <div className="grid-item grid-item-1">
            <div id="modeLanguage">
              <ModeSelector
                modeSelected={this.state.mode}
                onModeSelected={(mode) => this.handleMode(mode)}
              />
              <LanguageSelector
                languageSelected={this.state.language}
                onLanguageSelected={(arg) => this.handleLanguage(arg)}
              />
            </div>
          </div>
          <InputChecker
            prompt={this.state.prompt}
            onFinishedPrompt={this.generatePrompt}
          />
          <p classname="grid-item grid-item-5">123</p>
        </div>
      </div>
    );
  }
}

export default App;
