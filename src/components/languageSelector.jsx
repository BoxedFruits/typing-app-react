import React from "react";
import { languages } from "../prompts/languages.js";

const LanguageSelector = ({ language, onLanguageSelected }) => {
  return (
    <React.Fragment>
      <h1 id="languageLabel" style={{ fontSize: "1.25rem" }}>
        Language
      </h1>
      <select
        name="languages"
        id="languages"
        onChange={() =>
          onLanguageSelected(document.getElementById("languages").value)
        }
      >
        {languages.map((language) => (
          <option value={language}>
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};

export default LanguageSelector;
