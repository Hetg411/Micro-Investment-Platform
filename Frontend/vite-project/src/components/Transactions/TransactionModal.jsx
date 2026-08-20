import TransactionForm from "./TransactionForm";

function TransactionModal({
  show,
  editingTransaction,
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
        className="transaction-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <div className="modal-header">

          <div>

            <h2>
              {editingTransaction
                ? "Edit Transaction"
                : "Add Transaction"}
            </h2>

            <p>
              {editingTransaction
                ? "Update your transaction details."
                : "Add a new transaction and round-up saving."}
            </p>

          </div>


          <button
            className="close-modal"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        <TransactionForm
          form={form}
          editingTransaction={editingTransaction}
          onChange={onChange}
          onSubmit={onSubmit}
          onCancel={onClose}
        />

      </div>

    </div>
  );
}

export default TransactionModal;