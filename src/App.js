import React, { Component } from "react";
import "./App.css";
import InputChecker from "./components/inputChecker";
import LanguageSelector from "./components/languageSelector";
import ModeSelector from "./components/modeSelector";
import styled from "styled-components";
import sentencePrompts from "./prompts/sentencePrompts.json";
//import paragraphPrompts from "./prompts/paragraphPrompts.json"; //Need to get prompts for paragraphs

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
    /* let mode; //This is just a quick mock-up of what it could look like. Copying the array wastes a ton of space 
    if(mode == "sentence"){
      mode = sentencePrompts; //Spread operator?
    }else{mode = pararaphPrompts} //Need to use mode instead of sentence prompts.
     */
    const language = this.state.language;

    let max = sentencePrompts[language].length;
    let min = 0;
    var randIndex = Math.floor(Math.random() * (max - min)) + min;

    this.setState({ prompt: sentencePrompts[language][randIndex] });
  };

  handleMode = (mode) => {
    this.setState({ mode }, this.generatePrompt());
  };
  componentDidMount() {
    this.generatePrompt();
    console.log(this.state.prompt);
  }

  render() {
    return (
      <div className="App">
        <div className="grid-container">
          <div className="grid-item grid-item-1">
            <ModeSelector
              modeSelected={this.state.mode}
              onModeSelected={(mode) => this.handleMode(mode)}
            />
            <LanguageSelector
              languageSelected={this.state.language}
              onLanguageSelected={(arg) => this.handleLanguage(arg)}
            />
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
