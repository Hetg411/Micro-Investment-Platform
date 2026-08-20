function GoalItem({ goal, totalSaved }) {

const progress =
  goal.targetAmount > 0
    ? Math.min(
        (totalSaved / goal.targetAmount) * 100,
        100
      )
    : 0;
  return (
    <div
      className="goal-item"
      key={goal._id}
    >

      <div className="goal-info">

        <span>
          {goal.goalName}
        </span>

        <span>
         ₹{totalSaved.toLocaleString("en-IN")}
{" / "}
₹{goal.targetAmount.toLocaleString("en-IN")}
        </span>

      </div>

      <div className="progress-container">

        <div
          className="progress-bar"
          style={{
            width: `${progress}%`
          }}
        />

      </div>

      <small>
        {progress.toFixed(0)}% completed
      </small>

    </div>
  );
}

export default GoalItem;