function TransactionRow({
  transaction,
  onEdit,
  onDelete,
}) {
  return (
    <tr key={transaction._id}>

      <td>
        <div className="category-cell">

          <div className="category-icon">
            {transaction.category?.charAt(0)}
          </div>

          <span>
            {transaction.category}
          </span>

        </div>
      </td>

      <td className="amount-cell">
        ₹
        {Number(transaction.amount).toLocaleString(
          "en-IN"
        )}
      </td>

      <td>
        <span className="roundup-badge">
          +₹
          {Number(transaction.roundUp).toLocaleString(
            "en-IN"
          )}
        </span>
      </td>

      <td>
        {transaction.formattedDate}
      </td>

      <td className="remarks-cell">
        {transaction.remarks || "-"}
      </td>

      <td>

        <div className="action-buttons">

          <button
            className="edit-button"
            onClick={() => onEdit(transaction)}
            title="Edit"
          >
            ✎
          </button>

          <button
            className="delete-button"
            onClick={() =>
              onDelete(transaction._id)
            }
            title="Delete"
          >
            🗑
          </button>

        </div>

      </td>

    </tr>
  );
}

export default TransactionRow;