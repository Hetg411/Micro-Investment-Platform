function GrowthChart({
  dailyData,
  maxAmount,
  totalSaved,
  monthName,
  year,
  formatCurrency,
}) {
  return (
    <section className="growth-chart-card">

      {/* =================================
          HEADER
      ================================= */}

      <div className="growth-card-header">

        <div>

          <h2>
            Daily Round-up Savings
          </h2>

          <p>
            Your savings activity during{" "}
            {monthName} {year}.
          </p>

        </div>


        <div className="chart-total">

          ₹
          {formatCurrency(
            totalSaved
          )}

        </div>

      </div>


      {/* =================================
          BAR CHART
      ================================= */}

      <div className="bar-chart">

        {dailyData.map((item) => {

          const height =
            item.amount > 0
              ? Math.max(
                  (item.amount /
                    maxAmount) *
                    100,
                  5
                )
              : 2;

          return (

            <div
              className="chart-column"
              key={item.day}
            >

              {/* VALUE */}

              <div className="chart-value">

                {item.amount > 0
                  ? `₹${formatCurrency(
                      item.amount
                    )}`
                  : ""}

              </div>


              {/* BAR */}

              <div className="chart-bar-container">

                <div
                  className={`chart-bar ${
                    item.amount === 0
                      ? "empty"
                      : ""
                  }`}
                  style={{
                    height: `${height}%`,
                  }}
                  title={`Day ${item.day}: ₹${formatCurrency(
                    item.amount
                  )}`}
                />

              </div>


              {/* DAY */}

              <span>
                {item.day}
              </span>

            </div>

          );

        })}

      </div>

    </section>
  );
}

export default GrowthChart;