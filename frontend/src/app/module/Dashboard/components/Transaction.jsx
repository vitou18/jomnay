import React from "react";
import moment from "moment/moment";
import Tooltip from "../../../components/card/Tooltip";
import { TbReceiptDollar, TbLocationDollar  } from "react-icons/tb";
const Transaction = ({ category, amount, date, type }) => {
  const formattedDate = (date) => moment(date).format("Do MMM YYYY");

  return (
    <article className="flex justify-between p-2.5 items-center">
      <div className="flex items-center gap-x-3">
        <div
          className={`w-12 h-12 text-lg md:text-xl rounded-xl grid place-items-center
            ${
              type === "income"
                ? "text-green-600 bg-green-600/5"
                : "text-red-600 bg-red-600/5"
            }
            `}
        >
          {type === "income" ? <TbReceiptDollar /> : <TbLocationDollar  />}
        </div>

        <div>
          <h3 className="font-medium text-slate-900">{category}</h3>
          <span className="text-sm text-gray-500">{formattedDate(date)}</span>
        </div>
      </div>

      <Tooltip amount={amount} type={type} />
    </article>
  );
};

export default Transaction;
