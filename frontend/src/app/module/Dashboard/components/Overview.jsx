import Card from "./Card";
import { BiSolidWallet } from "react-icons/bi";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { FaSackDollar } from "react-icons/fa6";
import { TbReceiptDollar, TbLocationDollar } from "react-icons/tb";
const Overview = ({ data }) => {
  const formatNumber = (num) =>
    typeof num === "number" ? num.toFixed(2) : "0.00";

  const cardData = [
    {
      icon: TbReceiptDollar,
      blur: GiReceiveMoney,
      title: "Total Income",
      style: "green",
      balance: formatNumber(data?.totalIncome),
      desc: "All Time Earning",
    },
    {
      icon: TbLocationDollar,
      blur: GiPayMoney,
      title: "Total Expense",
      style: "red",
      balance: formatNumber(data?.totalExpense),
      desc: "All-time spending",
    },
    {
      icon: BiSolidWallet,
      blur: FaSackDollar,
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
