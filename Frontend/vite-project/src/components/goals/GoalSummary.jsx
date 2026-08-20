function GoalSummary({
  goals,
  totalSaved,
  formatCurrency,
}) {
  const totalTarget = goals.reduce(
    (total, goal) =>
      total + Number(goal.targetAmount || 0),
    0
  );

  const completedGoals = goals.filter(
    (goal) =>
      Number(goal.currentAmount || 0) >=
        Number(goal.targetAmount || 0) &&
      Number(goal.targetAmount || 0) > 0
  ).length;

  return (
    <div className="goal-summary">

      {/* TOTAL GOALS */}

      <div className="goal-summary-card">

        <div className="summary-icon">
          ◎
        </div>

        <div>
          <span>Total Goals</span>

          <strong>
            {goals.length}
          </strong>
        </div>

      </div>


      {/* TOTAL TARGET */}

      <div className="goal-summary-card">

        <div className="summary-icon">
          ₹
        </div>

        <div>
          <span>Total Target</span>

          <strong>
            ₹{formatCurrency(totalTarget)}
          </strong>
        </div>

      </div>


      {/* TOTAL SAVED */}

      <div className="goal-summary-card">

        <div className="summary-icon">
          ↗
        </div>

        <div>
          <span>Total Saved</span>

          <strong>
            ₹{formatCurrency(totalSaved)}
          </strong>
        </div>

      </div>


      {/* COMPLETED GOALS */}

      <div className="goal-summary-card">

        <div className="summary-icon">
          ✓
        </div>

        <div>
          <span>Completed</span>

          <strong>
            {completedGoals}
          </strong>
        </div>

      </div>

    </div>
  );
}

export default GoalSummary;