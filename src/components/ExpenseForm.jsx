import React, { useState } from "react";
import Input from "./Input";
import SelectOption from "./SelectOption";

export default function ExpenseForm({
  expense,
  setExpense,
  setExpenses,
  editingRowId,
  setEditingRowId,
}) {
  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please enter titile" },
      {
        minLength: 2,
        message: "Charactor should be at least 2 charactor long",
      },
    ],

    category: [{ required: true, message: "Please select category" }],

    amount: [
      { required: true, message: "Please enter an amount" },
      { pattern: /^\d+(\.\d{1,2})?$/, message: "Please enter valid number" },
    ],
  };

  const validation = (formData) => {
    const errorsData = {};
    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
        }
      });
    });

    setErrors(errorsData);
    return errorsData;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validate = validation(expense);

    if (Object.keys(validate).length) return;

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setEditingRowId("");
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      return;
    }

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);

    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={submitHandler}>
      <Input
        title="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={changeHandler}
        error={errors.title}
      />

      <SelectOption
        label="Category"
        name="category"
        id="category"
        value={expense.category}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        onChange={changeHandler}
        defaultOption="Select Category"
        error={errors.category}
      />

      <Input
        title="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={changeHandler}
        error={errors.amount}
      />
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
}
