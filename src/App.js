import React, { Component } from "react";
import "./App.css";
import InputChecker from "./components/inputChecker";
import LanguageSelector from "./components/languageSelector";
import ModeSelector from "./components/modeSelector";
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

  render() {
    return (
      <div className="App">
        {
          (document.onkeydown = function (evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
              this.generatePrompt();
              console.log("generate new prompt");
            }
          })
        }
        <button id="resetButton" onClick={this.generatePrompt}>
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 14 14"
            style={{ verticalAlign: "revert" }}
          >
            <path
              fill-rule="evenodd"
              d="M12.83 6.706a5 5 0 0 0-7.103-3.16.5.5 0 1 1-.454-.892A6 6 0 1 1 2.545 5.5a.5.5 0 1 1 .91.417 5 5 0 1 0 9.375.789z"
            />
            <path
              fill-rule="evenodd"
              d="M7.854.146a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 1 0 .708-.708L5.707 3 7.854.854a.5.5 0 0 0 0-.708z"
            />
          </svg>
        </button>
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
          {
            <InputChecker
              prompt={this.state.prompt}
              onFinishedPrompt={this.generatePrompt}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
