import GoalCard from "./GoalCard";

function GoalsGrid({
  goals,
  totalSaved,
  onEdit,
  onDelete,
  formatCurrency,
}) {
  return (
    <div className="goals-grid">
      {goals.map((goal) => (
        <GoalCard
          key={goal._id}
          goal={goal}
          totalSaved={totalSaved}
          onEdit={onEdit}
          onDelete={onDelete}
          formatCurrency={formatCurrency}
        />
      ))}
    </div>
  );
}

export default GoalsGrid;