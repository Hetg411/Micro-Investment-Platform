import GoalForm from "./GoalForm";

function GoalModal({
  show,
  editingGoal,
  form,
  onChange,
  onSubmit,
  onClose,
}) {
  if (!show) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="goal-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="modal-header">

          <div>

            <h2>
              {editingGoal
                ? "Edit Goal"
                : "Create Financial Goal"}
            </h2>

            <p>
              {editingGoal
                ? "Update your goal details."
                : "Set a target and start tracking your progress."}
            </p>

          </div>

          <button
            className="close-modal"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* FORM */}

        <GoalForm
          form={form}
          editingGoal={editingGoal}
          onChange={onChange}
          onSubmit={onSubmit}
          onCancel={onClose}
        />

      </div>

    </div>
  );
}

export default GoalModal;