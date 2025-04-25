import React from "react";
import useExpense from "../core/action";
import Input from "../../../utils/Input";
import Button from "../../../utils/Button";
import Textarea from "../../../utils/Textarea";

const Add = ({ onClick }) => {
  const { loading, expenseInfo, onChangeAdd, onCreateExpense } = useExpense();

  let { category, amount, date, note } = expenseInfo;

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await onCreateExpense();

    if (res) onClick();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-y-2.5 md:gap-y-5 mt-3">
        <Input
          label="Category"
          placeholder="Enter your category"
          name="category"
          type="text"
          value={category}
          onChange={onChangeAdd}
        />

        <Input
          label="Amount"
          placeholder="Enter your amount"
          name="amount"
          type="number"
          value={amount}
          onChange={onChangeAdd}
        />

        <Input
          label="Date"
          placeholder="Enter your date"
          name="date"
          type="date"
          value={date}
          onChange={onChangeAdd}
        />

        <Textarea
          label="Note"
          placeholder="Enter your note (optional)"
          name="note"
          value={note}
          onChange={onChangeAdd}
        />

        <Button
          text={loading ? "Adding Expense..." : "Add Expense"}
          type="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default Add;
