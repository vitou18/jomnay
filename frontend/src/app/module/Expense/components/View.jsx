import React, { useEffect, useState } from "react";
import Input from "../../../utils/Input";
import Textarea from "../../../utils/Textarea";
import moment from "moment";
import useExpense from "../core/action";

const View = () => {
  const { expenseDetails } = useExpense();

  let { category, amount, date, note } = expenseDetails;

  // console.log(expenseDetails);

  return (
    <form>
      <div className="grid gap-y-1.5 mt-5">
        <Input
          label="Catgory"
          placeholder="Enter your category"
          name="category"
          type="text"
          value={category}
          disabled
        />

        <Input
          label="Amount"
          placeholder="Enter your amount"
          name="amount"
          type="number"
          value={amount}
          disabled
        />

        <Input
          label="Date"
          placeholder="Enter your date"
          name="date"
          type="date"
          value={date ? moment(date).format("YYYY-MM-DD") : ""}
          disabled
        />

        <Textarea
          disabled
          label="Noted"
          placeholder="Enter your note"
          name="note"
          value={note}
        />
      </div>
    </form>
  );
};

export default View;
