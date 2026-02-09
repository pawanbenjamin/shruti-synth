import React, { useState } from "react";

import "./modal.css";

function Modal() {
  const [visible, setVisible] = useState(true);

  return (
    <div className={visible ? " drop-down shown" : "drop-down hidden"}>
      <p>
        Welcome to Your Favorite Microtonal Synth. Unfortuntaly on Google Chrome
        is the only browser which supports web MIDI. Please use Google Chrome!
      </p>
      <button onClick={() => setVisible(() => !visible)}>
        Im Using Google Chrome! Let's Go...
      </button>
    </div>
  );
}

export default Modal;
