function GrowthSummary({
  totalSaved,
  averageSaving,
  bestDay,
  daysWithSavings,
  monthName,
  year,
  formatCurrency,
}) {
  return (
    <div className="growth-summary">

      {/* =================================
          TOTAL SAVED
      ================================= */}

      <div className="growth-stat-card">

        <div className="growth-stat-icon">
          ₹
        </div>

        <div>

          <span>
            Total Saved
          </span>

          <strong>
            ₹
            {formatCurrency(
              totalSaved
            )}
          </strong>

          <small>
            {monthName} {year}
          </small>

        </div>

      </div>


      {/* =================================
          AVERAGE DAILY
      ================================= */}

      <div className="growth-stat-card">

        <div className="growth-stat-icon">
          ↗
        </div>

        <div>

          <span>
            Average Daily Saving
          </span>

          <strong>
            ₹
            {formatCurrency(
              averageSaving
            )}
          </strong>

          <small>
            Based on active saving days
          </small>

        </div>

      </div>


      {/* =================================
          BEST DAY
      ================================= */}

      <div className="growth-stat-card">

        <div className="growth-stat-icon">
          ★
        </div>

        <div>

          <span>
            Best Saving Day
          </span>

          <strong>
            ₹
            {formatCurrency(
              bestDay.amount
            )}
          </strong>

          <small>

            {bestDay.amount > 0
              ? `${monthName} ${bestDay.day}`
              : "No savings yet"}

          </small>

        </div>

      </div>


      {/* =================================
          ACTIVE DAYS
      ================================= */}

      <div className="growth-stat-card">

        <div className="growth-stat-icon">
          #
        </div>

        <div>

          <span>
            Active Days
          </span>

          <strong>
            {daysWithSavings}
          </strong>

          <small>
            Days with round-up savings
          </small>

        </div>

      </div>

    </div>
  );
}

export default GrowthSummary;