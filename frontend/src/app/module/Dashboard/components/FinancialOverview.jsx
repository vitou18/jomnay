import React from "react";
import Chart from "react-apexcharts";

const FinancialOverview = ({ data }) => {
  // console.log(data);

  const {
    totalIncome: income,
    totalExpense: expense,
    totalBalance: balance,
  } = data;

  const total = income + expense + balance;

  const options = {
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels: ["Total Income", "Total Expense", "Total Balance"],
    colors: ["#01a73e", "#e7010a", "#9811fb"],
    legend: {
      position: "bottom",
      offsetY: 20,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };

  const series = [income, expense, balance];

  return (
    <div className="flex-1 bg-white p-5 rounded-xl">
      <h2 className="text-lg md:text-xl font-medium text-slate-900 mb-7">
        Financial Overview
      </h2>

      <div className="donut-chart flex flex-col items-center justify-center space-y-4 relative">
        <Chart options={options} series={series} type="donut" width="400" />

        <div className="absolute top-[28%] sm:top-[33%] md:top-[35%] left-1/2 transform -translate-x-1/2 text-[14px] font-light sm:text-[18px] text-[#696969]">
          Total Balance:
        </div>
        <div className="absolute top-[38%] sm:top-[43%] left-1/2 transform -translate-x-1/2 text-[18px] sm:text-[26px] font-medium">
          ${total}
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;
