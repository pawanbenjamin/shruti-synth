import React, { useContext, useEffect, useState } from "react";
import { store } from "../state";
function UserMappings() {
  const { state, dispatch } = useContext(store);
  const { userMidiMap } = state;

  const [mappings, setMappings] = useState([]);

  useEffect(() => {
    let midiMap = [];
    for (let midiCC in userMidiMap) {
      midiMap.push({ [midiCC]: userMidiMap[midiCC] });
    }

    setMappings(midiMap);
  }, [userMidiMap]);

  const handleDelete = (noteNumber) => {
    console.log("In handle delete", noteNumber);
    dispatch({ type: "delete-mapping", value: noteNumber });
  };

  const content = mappings.map((mapping) => {
    for (let midiCC in mapping) {
      return (
        <>
          <span>
            Midi: {midiCC} -- Param: {mapping[midiCC]}
          </span>
          <button onClick={() => handleDelete(midiCC)}>x</button>
        </>
      );
    }
  });

  return (
    <div>
      <h3>current midi note: {state.noteObj.note}</h3>
      {content}
    </div>
  );
}

export default UserMappings;
