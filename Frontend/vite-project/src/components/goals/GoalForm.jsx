function GoalForm({
  form,
  editingGoal,
  onChange,
  onSubmit,
  onCancel,
}) {
  const targetAmount = Number(
    form.targetAmount || 0
  );

  const currentAmount = Number(
    form.currentAmount || 0
  );

  const progress =
    targetAmount > 0
      ? Math.min(
          (currentAmount / targetAmount) * 100,
          100
        )
      : 0;

  return (
    <form
      className="transaction-form"
      onSubmit={onSubmit}
    >

      {/* GOAL NAME */}

      <div className="form-field">

        <label>
          Goal Name
        </label>

        <input
          type="text"
          name="goalName"
          value={form.goalName}
          onChange={onChange}
          placeholder="Example: New Laptop"
          required
        />

      </div>


      {/* AMOUNTS */}

      <div className="form-row">

        <div className="form-field">

          <label>
            Target Amount
          </label>

          <div className="input-with-symbol">

            <span>₹</span>

            <input
              type="number"
              name="targetAmount"
              value={form.targetAmount}
              onChange={onChange}
              min="1"
              step="0.01"
              placeholder="50000"
              required
            />

          </div>

        </div>


        <div className="form-field">

          <label>
            Current Amount
          </label>

          <div className="input-with-symbol">

            <span>₹</span>

            <input
              type="number"
              name="currentAmount"
              value={form.currentAmount}
              onChange={onChange}
              min="0"
              step="0.01"
              placeholder="0"
              required
            />

          </div>

        </div>

      </div>


      {/* PREVIEW */}

      {targetAmount > 0 && (

        <div className="goal-preview">

          <div className="preview-header">

            <span>
              Goal Preview
            </span>

            <strong>
              {progress.toFixed(0)}%
            </strong>

          </div>


          <div className="preview-track">

            <div
              className="preview-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      )}


      {/* ACTIONS */}

      <div className="modal-actions">

        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="primary-action"
        >
          {editingGoal
            ? "Update Goal"
            : "Create Goal"}
        </button>

      </div>

    </form>
  );
}

export default GoalForm;