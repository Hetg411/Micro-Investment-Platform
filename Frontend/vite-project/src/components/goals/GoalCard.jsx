function GoalCard({
  goal,
  totalSaved,
  onEdit,
  onDelete,
  formatCurrency,
}) {
  const current = Number(
    goal.currentAmount || 0
  );

  const target = Number(
    goal.targetAmount || 0
  );

  

const progress =
  target > 0
    ? Math.min(
        (Number(totalSaved) / target) * 100,
        100
      )
    : 0;

  const completed =
    current >= target && target > 0;

  return (
    <div
      className="goal-card"
      key={goal._id}
    >

      {/* CARD HEADER */}

      <div className="goal-card-top">

        <div className="goal-title-area">

          <div className="goal-icon">

            {goal.goalName
              ?.charAt(0)
              ?.toUpperCase()}

          </div>

          <div>

            <h3>
              {goal.goalName}
            </h3>

            <span>
              {completed
                ? "Goal completed"
                : "In progress"}
            </span>

          </div>

        </div>


        {completed && (
          <div className="completed-badge">
            ✓ Completed
          </div>
        )}

      </div>


      {/* AMOUNTS */}

      <div className="goal-amounts">

        <div>
          <span>Saved</span>

          <strong>
            ₹{formatCurrency(current)}
          </strong>
        </div>

        <div>
          <span>Target</span>

          <strong>
            ₹{formatCurrency(target)}
          </strong>
        </div>

      </div>


      {/* PROGRESS */}

      <div className="goal-progress-section">

        <div className="goal-progress-header">

          <span>Progress</span>

          <strong>
            {progress.toFixed(0)}%
          </strong>

        </div>

        <div className="goal-progress-track">

          <div
            className={`goal-progress-fill ${
              completed
                ? "completed"
                : ""
            }`}
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>


      {/* REMAINING */}

      <div className="goal-remaining">

        {completed ? (

          <span>
            🎉 You reached your target!
          </span>

        ) : (

          <span>
            ₹
            {formatCurrency(
              Math.max(
                target - current,
                0
              )
            )}{" "}
            remaining
          </span>

        )}

      </div>


      {/* ACTIONS */}

      <div className="goal-actions">

        <button
          className="goal-edit-button"
          onClick={() => onEdit(goal)}
        >
          ✎ Edit
        </button>

        <button
          className="goal-delete-button"
          onClick={() =>
            onDelete(goal._id)
          }
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default GoalCard;