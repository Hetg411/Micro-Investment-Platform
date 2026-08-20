import StatCard from "./StatCard";

function StatsGrid({
  balance,
  totalSaved,
  goalsCount,
  transactionsCount
}) {
  return (
    <div className="stats-grid">

      <StatCard
        title="Available Balance"
        icon="₹"
        value={`₹${balance.toLocaleString("en-IN")}`}
        description="Available for investment"
      />

      <StatCard
        title="Total Round-up Saved"
        icon="↗"
        value={`₹${totalSaved.toLocaleString("en-IN")}`}
        description="Automatically saved"
      />

      <StatCard
        title="Active Goals"
        icon="◎"
        value={goalsCount}
        description="Financial goals"
      />

      <StatCard
        title="Recent Activity"
        icon="↕"
        value={transactionsCount}
        description="Recent transactions"
      />

    </div>
  );
}

export default StatsGrid;