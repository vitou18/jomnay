import React, { useEffect } from "react";
import useDashboard from "./core/action";
import Overview from "./components/Overview";
import RecentTransaction from "./components/RecentTransaction";
import FinancialOverview from "./components/FinancialOverview";
import Container from "../../components/layout/Container";
import { DashboardLoader } from "../../components/other/Loader";

const Dashboard = () => {
  const { dashboard, fetchDashboard, loading } = useDashboard();

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Handle loading state
  if (loading) {
    return <DashboardLoader />;
  }

  // Render actual content when data is available
  return (
    <Container title="Dashboard">
      {dashboard.recentTransactions?.length > 0 ? (
        <>
          <Overview data={dashboard} />
          <div className="flex flex-col gap-5 lg:flex-row">
            <RecentTransaction data={dashboard.recentTransactions} />
            <FinancialOverview data={dashboard} />
          </div>
        </>
      ) : (
        <div className="h-30 text-gray-500 w-full flex items-center justify-center text-center">
          No data available
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
