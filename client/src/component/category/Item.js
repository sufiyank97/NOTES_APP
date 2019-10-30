import React from "react";

export default function CategoryItem(props) {
  const { name, id, removeHandle } = props;
  return (
    <ul>
      <li>
        {name}
        <button
          onClick={() => {
            const confirm = window.confirm("Are you sure?");
            if (confirm) {
              removeHandle(id);
            }
          }}
        >
          remove
        </button>
      </li>
    </ul>
  );
}
