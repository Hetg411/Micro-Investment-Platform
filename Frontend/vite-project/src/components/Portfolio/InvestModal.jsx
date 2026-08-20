function InvestModal({
  show,
  selectedStock,
  balance,
  investmentAmount,
  investing,
  formatCurrency,
  onAmountChange,
  onSubmit,
  onClose,
}) {

  if (
    !show ||
    !selectedStock
  ) {
    return null;
  }


  const symbol =
    selectedStock.symbol.replace(
      ".NS",
      ""
    );


  const amount =
    Number(
      investmentAmount || 0
    );


  const price =
    Number(
      selectedStock.price || 0
    );


  const estimatedQuantity =
    price > 0
      ? amount / price
      : 0;


  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="invest-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="modal-header">

          <div>

            <h2>
              Invest in {symbol}
            </h2>

            <p>
              Current price: ₹
              {formatCurrency(
                selectedStock.price
              )}
            </p>

          </div>


          <button
            className="close-modal"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* FORM */}

        <form
          className="investment-form"
          onSubmit={onSubmit}
        >

          {/* INFO */}

          <div className="investment-info">

            <div>

              <span>
                Available Balance
              </span>

              <strong>
                ₹
                {formatCurrency(
                  balance
                )}
              </strong>

            </div>


            <div>

              <span>
                Stock Price
              </span>

              <strong>
                ₹
                {formatCurrency(
                  selectedStock.price
                )}
              </strong>

            </div>

          </div>


          {/* AMOUNT */}

          <div className="form-field">

            <label>
              Investment Amount
            </label>

            <div className="input-with-symbol">

              <span>
                ₹
              </span>

              <input
                type="number"
                value={
                  investmentAmount
                }
                onChange={(e) =>
                  onAmountChange(
                    e.target.value
                  )
                }
                min="1"
                max={balance}
                step="0.01"
                placeholder="1000"
                required
              />

            </div>

          </div>


          {/* PREVIEW */}

          {amount > 0 && (

            <div className="investment-preview">

              <span>
                Estimated Quantity
              </span>

              <strong>
                {estimatedQuantity.toFixed(
                  4
                )}
              </strong>

            </div>

          )}


          {/* ACTIONS */}

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={investing}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="primary-action"
              disabled={investing}
            >

              {investing
                ? "Investing..."
                : "Confirm Investment"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default InvestModal;