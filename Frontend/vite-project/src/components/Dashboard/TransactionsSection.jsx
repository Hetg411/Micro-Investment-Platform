import TransactionItem from "./TransactionItem";

function TransactionsSection({ transactions }) {
  return (
    <section className="dashboard-card">

      <div className="card-header">

        <div>
          <h3>Recent Transactions</h3>

          <p>
            Your latest spending activity
          </p>
        </div>

      </div>

      {transactions.length === 0 ? (

        <div className="empty-state">

          <div>↕</div>

          <p>
            No transactions found.
          </p>

        </div>

      ) : (

        <div className="transaction-list">

          {transactions
            .slice(0, 5)
            .map((transaction) => (
              <TransactionItem
                key={transaction._id}
                transaction={transaction}
              />
            ))}

        </div>

      )}

    </section>
  );
}

export default TransactionsSection;