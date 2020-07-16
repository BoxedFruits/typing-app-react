import React from "react";

const ModeSelector = ({ onModeSelected }) => {
  return (
    <select
      id="modeSelect"
      style={{ backgroundColor: "yellow" }}
      onChange={() =>
        onModeSelected(document.getElementById("modeSelect").value)
      }
    >
      <option value="sentence">Sentence</option>
      <option value="paragraph">Paragraph</option>
    </select>
  );
};

export default ModeSelector;
