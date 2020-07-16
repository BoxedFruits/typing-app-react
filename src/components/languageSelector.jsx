import React from "react";
import { languages } from "../prompts/languages.js";

const LanguageSelector = ({ language, onLanguageSelected }) => {
  return (
    <select
      name="languages"
      id="languages"
      style={{ backgroundColor: "brown" }}
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
  );
};

export default LanguageSelector;
