const categories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Groceries",
  "Health",
  "Other",
];

function TransactionForm({
  form,
  editingTransaction,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form
      className="transaction-form"
      onSubmit={onSubmit}
    >

      <div className="form-row">

        <div className="form-field">

          <label>Amount</label>

          <div className="input-with-symbol">

            <span>₹</span>

            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={onChange}
              min="0"
              step="0.01"
              placeholder="500"
              required
            />

          </div>

        </div>


        <div className="form-field">

          <label>Round Up</label>

          <div className="input-with-symbol">

            <span>₹</span>

            <input
              type="number"
              name="roundUp"
              value={form.roundUp}
              onChange={onChange}
              min="0"
              step="0.01"
              placeholder="20"
              required
            />

          </div>

        </div>

      </div>


      <div className="form-row">

        <div className="form-field">

          <label>Category</label>

          <select
            name="category"
            value={form.category}
            onChange={onChange}
            required
          >

            {categories.map((item) => (
              <option
                value={item}
                key={item}
              >
                {item}
              </option>
            ))}

          </select>

        </div>


        <div className="form-field">

          <label>Date</label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            required
          />

        </div>

      </div>


      <div className="form-field">

        <label>Remarks</label>

        <textarea
          name="remarks"
          value={form.remarks}
          onChange={onChange}
          placeholder="Example: Lunch with friends"
          rows="3"
        />

      </div>


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
          {editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
        </button>

      </div>

    </form>
  );
}

export default TransactionForm;