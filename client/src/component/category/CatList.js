import React from "react";

function CatList({ id, name, handleRemove }) {
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
export default CatList;
