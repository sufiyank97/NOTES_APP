import React from "react";

function Cat_List({ id, name, handleRemove }) {
  return (
    <tr>
      <td>{name}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => {
            handleRemove(id);
          }}
        >
          Del
        </button>
      </td>
    </tr>
  );
}
export default Cat_List;
