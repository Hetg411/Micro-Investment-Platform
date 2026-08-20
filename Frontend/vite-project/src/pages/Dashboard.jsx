import { useEffect, useState } from "react";
import API from "../services/api";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import GoalsSection from "../components/dashboard/GoalsSection";
import TransactionsSection from "../components/dashboard/TransactionsSection";
import "../components/dashboard/dashboard.css";

function Dashboard() {

  const [balance, setBalance] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const [goals, setGoals] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const [
        balanceResponse,
        savedResponse,
        goalsResponse,
        transactionsResponse
      ] = await Promise.all([
        API.get("/portfolio/awailableBalance"),
        API.get("/transactions/total"),
        API.get("/goals/goals"),
        API.get("/transactions/transaction/recent")
      ]);

      setBalance(
        balanceResponse.data.data?.balance || 0
      );

      setTotalSaved(
        savedResponse.data.data?.totalSaved || 0
      );

      setGoals(
        goalsResponse.data.data || []
      );

      setTransactions(
        transactionsResponse.data.data || []
      );

    } catch (error) {

      console.error(
        "Dashboard error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading dashboard...
      </div>
    );
  }

  return (

    <div className="dashboard">

      <DashboardHeader />

      <StatsGrid
        balance={balance}
        totalSaved={totalSaved}
        goalsCount={goals.length}
        transactionsCount={transactions.length}
      />

      <div className="dashboard-grid">

        <GoalsSection
  goals={goals}
  totalSaved={totalSaved}
/>

        <TransactionsSection
          transactions={transactions}
        />

      </div>

    </div>

  );
}

export default Dashboard;