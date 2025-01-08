import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import "./App.css";
import ExpenseTable from "./components/ExpenseTable";
import useLocalStorage from './hooks/UseLocalStorage';

export default function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", '');

  const [expense, setExpense] = useLocalStorage('expense', {
    title: "",
    category: "",
    amount: "",
  });

  const [editingRowId, setEditingRowId] = useLocalStorage("editingRowId", "");

  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          setExpenses={setExpenses}
          expense={expense}
          setExpense={setExpense}
          editingRowId={editingRowId}
          setEditingRowId={setEditingRowId}
        />
        <ExpenseTable
          expenses={expenses}
          setExpenses={setExpenses}
          setExpense={setExpense}
          setEditingRowId={setEditingRowId}
        />
      </div>
    </main>
  );
}
