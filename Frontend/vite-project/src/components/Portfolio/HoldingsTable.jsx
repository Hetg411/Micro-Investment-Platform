function HoldingsTable({
  portfolio,
  formatCurrency,
}) {

  return (
    <section className="portfolio-section">

      <div className="section-heading">

        <div>

          <h2>
            My Holdings
          </h2>

          <p>
            Your current stock investments.
          </p>

        </div>

      </div>


      {portfolio.length === 0 ? (

        <div className="portfolio-empty">

          <div className="portfolio-empty-icon">
            ◇
          </div>

          <h3>
            No investments yet
          </h3>

          <p>
            Start investing in stocks
            from the market below.
          </p>

        </div>

      ) : (

        <div className="holdings-table-wrapper">

          <table className="holdings-table">

            <thead>

              <tr>

                <th>
                  Stock
                </th>

                <th>
                  Quantity
                </th>

                <th>
                  Avg. Buy Price
                </th>

                <th>
                  Current Price
                </th>

                <th>
                  Invested
                </th>

                <th>
                  Current Value
                </th>

                <th>
                  P/L
                </th>

              </tr>

            </thead>


            <tbody>

              {portfolio.map((item) => {

                const profit =
                  Number(
                    item.profitLoss || 0
                  );

                const percentage =
                  Number(
                    item.profitLossPercentage ||
                      0
                  );

                const symbol =
                  item.stockSymbol.replace(
                    ".NS",
                    ""
                  );

                return (

                  <tr
                    key={
                      item.stockSymbol
                    }
                  >

                    {/* STOCK */}

                    <td>

                      <div className="stock-name-cell">

                        <div className="stock-avatar">
                          {symbol.charAt(0)}
                        </div>

                        <div>

                          <strong>
                            {symbol}
                          </strong>

                          <small>
                            NSE
                          </small>

                        </div>

                      </div>

                    </td>


                    {/* QUANTITY */}

                    <td>
                      {Number(
                        item.quantity
                      ).toFixed(4)}
                    </td>


                    {/* AVG BUY */}

                    <td>
                      ₹
                      {formatCurrency(
                        item.avgBuyPrice
                      )}
                    </td>


                    {/* CURRENT PRICE */}

                    <td>
                      ₹
                      {formatCurrency(
                        item.currentPrice
                      )}
                    </td>


                    {/* INVESTED */}

                    <td>
                      ₹
                      {formatCurrency(
                        item.totalInvested
                      )}
                    </td>


                    {/* CURRENT VALUE */}

                    <td>
                      ₹
                      {formatCurrency(
                        item.currentValue
                      )}
                    </td>


                    {/* P/L */}

                    <td>

                      <div
                        className={
                          profit >= 0
                            ? "pl-positive"
                            : "pl-negative"
                        }
                      >

                        <strong>

                          {profit >= 0
                            ? "+"
                            : "-"}

                          ₹
                          {formatCurrency(
                            Math.abs(
                              profit
                            )
                          )}

                        </strong>


                        <small>

                          {profit >= 0
                            ? "+"
                            : ""}

                          {percentage.toFixed(
                            2
                          )}

                          %

                        </small>

                      </div>

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

export default HoldingsTable;