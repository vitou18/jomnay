/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import useDashboard from "./core/action";
import Overview from "./components/Overview";
import RecentTransaction from "./components/RecentTransaction";
import FinancialOverview from "./components/FinancialOverview";
import Container from "../../components/layout/Container";

const Dashboard = () => {
  const { dashboard, fetchDashboard } = useDashboard();

  useEffect(() => {
    fetchDashboard();
  }, []);

  // console.log(dashboard);

  return (
    <Container title="Dashboard">
      <Overview data={dashboard} />

      {dashboard.recentTransactions?.length > 0 ? (
        <div className="flex flex-col gap-5 lg:flex-row">
          <RecentTransaction data={dashboard.recentTransactions} />
          <FinancialOverview data={dashboard} />
        </div>
      ) : (
        <div className="h-32 text-gray-500 w-full flex items-center text-center justify-center">
          No data available
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
