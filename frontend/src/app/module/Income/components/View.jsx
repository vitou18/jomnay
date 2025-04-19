import React, { useEffect, useState } from "react";
import Input from "../../../utils/Input";
import useIncome from "../core/action";
import Textarea from "../../../utils/Textarea";
import moment from "moment";

const View = () => {
  const { incomeDetails } = useIncome();

  let { category, amount, date, note } = incomeDetails;

  // console.log(incomeDetails);

  return (
    <form>
      <div className="grid gap-y-1.5 mt-5">
        <Input
          label="Source"
          placeholder="Enter your source"
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
          label="Note"
          placeholder="Enter your note"
          name="note"
          value={note}
        />
      </div>
    </form>
  );
};

export default View;
