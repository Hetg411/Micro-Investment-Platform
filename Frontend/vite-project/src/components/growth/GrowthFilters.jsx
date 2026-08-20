function GrowthFilters({
  month,
  year,
  months,
  years,
  onMonthChange,
  onYearChange,
}) {
  return (
    <div className="growth-filters">

      {/* MONTH */}

      <select
        value={month}
        onChange={(e) =>
          onMonthChange(
            e.target.value
          )
        }
      >

        {months.map(
          (monthName, index) => (

            <option
              value={index + 1}
              key={monthName}
            >
              {monthName}
            </option>

          )
        )}

      </select>


      {/* YEAR */}

      <select
        value={year}
        onChange={(e) =>
          onYearChange(
            e.target.value
          )
        }
      >

        {years.map((item) => (

          <option
            value={item}
            key={item}
          >
            {item}
          </option>

        ))}

      </select>

    </div>
  );
}

export default GrowthFilters;