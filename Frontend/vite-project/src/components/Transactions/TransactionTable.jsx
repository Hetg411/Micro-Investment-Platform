import TransactionRow from "./TransactionRow";

function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}) {
  return (
    <div className="table-wrapper">

      <table>

        <thead>

          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Round Up</th>
            <th>Date</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction._id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default TransactionTable;