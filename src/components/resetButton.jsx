import React from "react";

const ResetButton = ({ onResetPrompt }) => {
  return (
    <button id="resetButton" onClick={onResetPrompt}>
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
  );
};

// class ResetButton extends Component {
//   state = {};
//   render() {
//     return (
//       <button id="resetButton" onClick={this.props.onResetPrompt}>
//         <svg
//           width="14px"
//           height="14px"
//           viewBox="0 0 14 14"
//           style={{ verticalAlign: "revert" }}
//         >
//           <path
//             fill-rule="evenodd"
//             d="M12.83 6.706a5 5 0 0 0-7.103-3.16.5.5 0 1 1-.454-.892A6 6 0 1 1 2.545 5.5a.5.5 0 1 1 .91.417 5 5 0 1 0 9.375.789z"
//           />
//           <path
//             fill-rule="evenodd"
//             d="M7.854.146a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 1 0 .708-.708L5.707 3 7.854.854a.5.5 0 0 0 0-.708z"
//           />
//         </svg>
//       </button>
//     );
//   }
// }

//export default ResetButton;
export default ResetButton;
