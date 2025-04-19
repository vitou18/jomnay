import React from "react";
import HeaderTable from "../../../layout/components/table/HeaderTable";
import Transaction from "./Transaction";

const RecentTransaction = ({ data }) => {
  // console.log(data);

  return (
    <section className="bg-white rounded-xl p-5 flex flex-col gap-y-7 flex-1">
      <HeaderTable title="Recent Transaction" />

      <div className="flex flex-col">
        {data?.slice(0, 5).map((item, index) => (
          <Transaction
            key={item.id || index}
            amount={item.amount}
            category={item.category}
            type={item.type}
            date={item.date}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentTransaction;
