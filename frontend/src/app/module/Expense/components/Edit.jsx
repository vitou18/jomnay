/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useExpense from "../core/action";
import moment from "moment/moment";
import Input from "../../../utils/Input";
import Button from "../../../utils/Button";
import Textarea from "../../../utils/Textarea";
import toast from "react-hot-toast";

const Edit = ({ onClick }) => {
  const { loading, onChangeEdit, expenseDetails, onUpdateExpense } =
    useExpense();
  const [verify, setVerify] = useState(null);

  useEffect(() => {
    setVerify(expenseDetails);
  }, []);

  let { category, amount, date, note } = expenseDetails;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (expenseDetails === verify) {
      toast.error("No Changes Detected...");

      return;
    }

    await onUpdateExpense();
    onClick();
  };

  //   console.log(expenseDetails);

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-y-2.5 md:gap-y-5 mt-5">
        <Input
          label="Category"
          placeholder="Enter your category"
          name="category"
          type="text"
          value={category}
          onChange={onChangeEdit}
        />

        <Input
          label="Amount"
          placeholder="Enter your amount"
          name="amount"
          type="number"
          value={amount}
          onChange={onChangeEdit}
        />

        <Input
          label="Date"
          placeholder="Enter your date"
          name="date"
          type="date"
          value={date ? moment(date).format("YYYY-MM-DD") : ""}
          onChange={onChangeEdit}
        />

        <Textarea
          label="Note"
          placeholder="Enter your note"
          name="note"
          value={note}
          onChange={onChangeEdit}
        />

        <Button
          text={loading ? "Updating Expense..." : "Update Expense"}
          type="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default Edit;
