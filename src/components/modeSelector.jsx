import React from "react";

const ModeSelector = ({ onModeSelected }) => {
  return (
    <React.Fragment>
      <h1 id="modeLabel" style={{ fontSize: "1.25rem" }}>
        Mode
      </h1>
      <select
        id="modeSelect"
        onChange={() =>
          onModeSelected(document.getElementById("modeSelect").value)
        }
      >
        <option value="sentence">Sentence</option>
        <option value="paragraph">Paragraph</option>
      </select>
    </React.Fragment>
  );
};

export default ModeSelector;
