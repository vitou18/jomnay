import React from "react";
import Input from "../../../utils/Input";
import Button from "../../../utils/Button";
import useIncome from "../core/action";
import Textarea from "../../../utils/Textarea";

const Add = ({ onClick }) => {
  const { onChangeAdd, incomeInfo, onCreateIncome, loading } = useIncome();
  const { category, amount, date, note } = incomeInfo;

  const onSubmit = async (e) => {
    e.preventDefault();

    await onCreateIncome();
    onClick();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-y-1.5 mt-5">
        <Input
          label="Source"
          placeholder="Enter your source"
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
          placeholder="Enter your note"
          name="note"
          value={note}
          onChange={onChangeAdd}
        />

        <Button
          text={loading ? "Adding Income..." : "Add Income"}
          type="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default Add;
