import Card from "./Card";
import { FaBalanceScale, FaHandHoldingUsd, FaMoneyBillWave } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineAttachMoney, MdOutlineMoneyOff } from "react-icons/md";

const Overview = ({ data }) => {
  const formatNumber = (num) =>
    typeof num === "number" ? num.toFixed(2) : "0.00";

  const cardData = [
    {
      icon: MdOutlineAttachMoney,
      blur: FaHandHoldingUsd,
      title: "Total Income",
      style: "green",
      balance: formatNumber(data?.totalIncome),
      desc: "All Time Earning",
    },
    {
      icon: MdOutlineMoneyOff,
      blur: FaMoneyBillWave,
      title: "Total Expense",
      style: "red",
      balance: formatNumber(data?.totalExpense),
      desc: "All-time spending",
    },
    {
      icon: IoWalletOutline,
      blur: FaBalanceScale,
      title: "Total Balance",
      style: "blue",
      balance: formatNumber(data?.totalBalance),
      desc: "Available funds",
    },
  ];

  return (
    <section className="flex flex-wrap gap-5">
      {cardData.map((item, index) => (
        <Card
          key={index}
          icon={item.icon}
          title={item.title}
          balance={item.balance}
          style={item.style}
          desc={item.desc}
          blur={item.blur}
        />
      ))}
    </section>
  );
};

export default Overview;
