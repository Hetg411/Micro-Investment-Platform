function TransactionItem({ transaction }) {
  return (
    <div
      className="transaction-item"
    >

      <div className="transaction-left">

        <div className="transaction-icon">
          {transaction.category?.charAt(0)}
        </div>

        <div>

          <strong>
            {transaction.category}
          </strong>

          <small>
            {transaction.remarks || "Transaction"}
          </small>

        </div>

      </div>

      <div className="transaction-right">

        <strong>
          ₹{transaction.amount.toLocaleString("en-IN")}
        </strong>

        <small>
          +₹{transaction.roundUp}
        </small>

      </div>

    </div>
  );
}

export default TransactionItem;