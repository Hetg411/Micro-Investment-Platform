const categories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Groceries",
  "Health",
  "Other",
];

function TransactionFilters({
  category,
  startDate,
  endDate,
  onCategoryChange,
  onStartDateChange,
  onEndDateChange,
  onClear,
}) {
  return (
    <div className="filter-card">

      <div className="filter-group">

        <label>Category</label>

        <select
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value)
          }
        >
          <option value="">
            All Categories
          </option>

          {categories.map((item) => (
            <option
              value={item}
              key={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>


      <div className="filter-group">

        <label>Start Date</label>

        <input
          type="date"
          value={startDate}
          onChange={(e) =>
            onStartDateChange(e.target.value)
          }
        />

      </div>


      <div className="filter-group">

        <label>End Date</label>

        <input
          type="date"
          value={endDate}
          onChange={(e) =>
            onEndDateChange(e.target.value)
          }
        />

      </div>


      <button
        className="clear-filter"
        onClick={onClear}
      >
        Clear Filters
      </button>

    </div>
  );
}

export default TransactionFilters;