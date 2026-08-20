function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <div className="pagination">

      <button
        disabled={page === 1}
        onClick={onPrevious}
      >
        ← Previous
      </button>


      <div className="page-number">
        Page {page} of {totalPages}
      </div>


      <button
        disabled={page >= totalPages}
        onClick={onNext}
      >
        Next →
      </button>

    </div>
  );
}

export default Pagination;