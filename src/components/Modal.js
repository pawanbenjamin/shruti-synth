import React, { useState } from "react";

import "./modal.css";

function Modal(props) {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <div className={visible ? " drop-down shown" : "drop-down hidden"}>
        <p>
          Welcome to Your Favorite Microtonal Synth. Please use Google Chrome!
        </p>
        <button onClick={() => setVisible(() => !visible)}>Enter</button>
      </div>
    </>
  );
}

export default Modal;
