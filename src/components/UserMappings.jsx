import React, { useContext, useMemo } from "react";
import { store } from "../state";

function UserMappings() {
  const { state, dispatch } = useContext(store);
  const { userCCMap, noteObj } = state;

  const handleDelete = (ccNumber) => {
    dispatch({ type: "delete-cc-mapping", value: ccNumber });
  };

  // Convert userCCMap object to array for rendering
  const mappings = useMemo(() => {
    if (!userCCMap) return [];
    return Object.entries(userCCMap).map(([ccNumber, paramName]) => ({
      ccNumber,
      paramName,
    }));
  }, [userCCMap]);

  return (
    <div className="user-mappings">
      <p>
        Click on a synth parameter in <span style={{ color: 'red', fontWeight: 'bold' }}>RED</span>,
        then move a MIDI CC controller (knob/slider) to map it.
      </p>
      <h4>Current MIDI Input: {noteObj?.note !== undefined ? `Note ${noteObj.note}` : 'None'}</h4>

      {mappings.length > 0 ? (
        <div>
          <h4>Active CC Mappings:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {mappings.map(({ ccNumber, paramName }) => (
              <li key={ccNumber} style={{ marginBottom: '4px' }}>
                <span>CC {ccNumber} → {paramName}</span>
                <button
                  onClick={() => handleDelete(ccNumber)}
                  style={{ marginLeft: '8px' }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p><em>No CC mappings configured yet.</em></p>
      )}
    </div>
  );
}

export default UserMappings;
