function DailyBreakdown({
  dailyData,
  daysWithSavings,
  formatCurrency,
}) {
  const savingDays = dailyData.filter(
    (item) =>
      item.amount > 0
  );

  return (
    <section className="daily-saving-card">

      {/* =================================
          HEADER
      ================================= */}

      <div className="growth-card-header">

        <div>

          <h2>
            Daily Breakdown
          </h2>

          <p>
            Round-up savings for each day.
          </p>

        </div>

      </div>


      {/* =================================
          DAILY DATA
      ================================= */}

      <div className="daily-grid">

        {savingDays.map((item) => (

          <div
            className="daily-item"
            key={item.day}
          >

            {/* DAY */}

            <div className="daily-day">

              <span>
                Day
              </span>

              <strong>
                {item.day}
              </strong>

            </div>


            {/* LINE */}

            <div className="daily-line" />


            {/* AMOUNT */}

            <div className="daily-amount">

              <span>
                Saved
              </span>

              <strong>
                +₹
                {formatCurrency(
                  item.amount
                )}
              </strong>

            </div>

          </div>

        ))}

      </div>


      {/* =================================
          EMPTY STATE
      ================================= */}

      {daysWithSavings === 0 && (

        <div className="growth-empty">

          <div>
            ↗
          </div>

          <h3>
            No savings this month
          </h3>

          <p>
            Your round-up savings will
            appear here when you make
            transactions.
          </p>

        </div>

      )}

    </section>
  );
}

export default DailyBreakdown;