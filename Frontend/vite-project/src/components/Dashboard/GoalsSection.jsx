import GoalItem from "./GoalItem";

function GoalsSection({ goals, totalSaved }) {
  return (
    <section className="dashboard-card">

      <div className="card-header">

        <div>
          <h3>Financial Goals</h3>

          <p>
            Track your savings progress
          </p>
        </div>

      </div>

      {goals.length === 0 ? (

        <div className="empty-state">

          <div>◎</div>

          <p>
            No goals created yet.
          </p>

        </div>

      ) : (

        <div className="goals-list">

          {goals
            .slice(0, 3)
            .map((goal) => (
              <GoalItem
                key={goal._id}
                goal={goal}
                 totalSaved={totalSaved}
              />
            ))}

        </div>

      )}

    </section>
  );
}

export default GoalsSection;