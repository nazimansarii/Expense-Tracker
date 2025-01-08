import React from "react";

export default function ContextMenu({
  contextMenu,
  rowId,
  setExpenses,
  setContextMemu,
  setExpense,
  expenses,
  setEditingRowId
}) {
  if (!contextMenu.left) return;
  return (
    <div className="context-menu" style={{ ...contextMenu }}>
      <div
        onClick={() => {
          const { title, category, amount } = expenses.find(
            (expense) => expense.id === rowId
          );
          setExpense({ title, category, amount });
          setContextMemu({});
          setEditingRowId(rowId)
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses((prevState) =>
            prevState.filter((expense) => expense.id !== rowId)
          );
          setContextMemu({});
        }}
      >
        Delete
      </div>
    </div>
  );
}
