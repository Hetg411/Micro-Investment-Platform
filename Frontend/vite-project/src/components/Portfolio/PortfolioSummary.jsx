function PortfolioSummary({
  totalInvested,
  currentValue,
  totalProfitLoss,
  totalProfitLossPercentage,
  formatCurrency,
}) {

  const isProfit =
    totalProfitLoss >= 0;

  const isPositiveReturn =
    totalProfitLossPercentage >= 0;

  return (
    <div className="portfolio-summary">

      {/* TOTAL INVESTED */}

      <div className="portfolio-stat-card">

        <div className="portfolio-stat-icon">
          ₹
        </div>

        <div>

          <span>
            Total Invested
          </span>

          <strong>
            ₹{formatCurrency(
              totalInvested
            )}
          </strong>

        </div>

      </div>


      {/* CURRENT VALUE */}

      <div className="portfolio-stat-card">

        <div className="portfolio-stat-icon">
          ↗
        </div>

        <div>

          <span>
            Current Value
          </span>

          <strong>
            ₹{formatCurrency(
              currentValue
            )}
          </strong>

        </div>

      </div>


      {/* PROFIT / LOSS */}

      <div className="portfolio-stat-card">

        <div className="portfolio-stat-icon">
          {isProfit ? "↗" : "↘"}
        </div>

        <div>

          <span>
            Total P/L
          </span>

          <strong
            className={
              isProfit
                ? "profit-text"
                : "loss-text"
            }
          >
            {isProfit ? "+" : "-"}
            ₹
            {formatCurrency(
              Math.abs(
                totalProfitLoss
              )
            )}
          </strong>

        </div>

      </div>


      {/* RETURN */}

      <div className="portfolio-stat-card">

        <div className="portfolio-stat-icon">
          %
        </div>

        <div>

          <span>
            Overall Return
          </span>

          <strong
            className={
              isPositiveReturn
                ? "profit-text"
                : "loss-text"
            }
          >

            {isPositiveReturn
              ? "+"
              : ""}

            {totalProfitLossPercentage.toFixed(
              2
            )}

            %

          </strong>

        </div>

      </div>

    </div>
  );
}

export default PortfolioSummary;