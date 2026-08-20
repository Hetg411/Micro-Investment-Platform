function InvestmentHistory({
  investments,
  formatCurrency,
}) {

  return (
    <section className="portfolio-section">

      <div className="section-heading">

        <div>

          <h2>
            Investment History
          </h2>

          <p>
            Your recent investment activity.
          </p>

        </div>

      </div>


      {investments.length === 0 ? (

        <div className="history-empty">
          No investment history yet.
        </div>

      ) : (

        <div className="history-table-wrapper">

          <table className="history-table">

            <thead>

              <tr>

                <th>
                  Stock
                </th>

                <th>
                  Type
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Quantity
                </th>

                <th>
                  Price
                </th>

                <th>
                  Date
                </th>

              </tr>

            </thead>


            <tbody>

              {investments
                .slice(0, 10)
                .map((investment) => {

                  const symbol =
                    investment.stockSymbol.replace(
                      ".NS",
                      ""
                    );

                  return (

                    <tr
                      key={
                        investment._id
                      }
                    >

                      <td>
                        <strong>
                          {symbol}
                        </strong>
                      </td>


                      <td>

                        <span
                          className={
                            investment.type ===
                            "BUY"
                              ? "buy-badge"
                              : "sell-badge"
                          }
                        >
                          {investment.type}
                        </span>

                      </td>


                      <td>
                        ₹
                        {formatCurrency(
                          investment.amount
                        )}
                      </td>


                      <td>
                        {Number(
                          investment.quantity
                        ).toFixed(4)}
                      </td>


                      <td>
                        ₹
                        {formatCurrency(
                          investment.priceAtPurchase
                        )}
                      </td>


                      <td>

                        {new Date(
                          investment.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}

                      </td>

                    </tr>

                  );

                })}

            </tbody>

          </table>

        </div>

      )}

    </section>
  );
}

export default InvestmentHistory;