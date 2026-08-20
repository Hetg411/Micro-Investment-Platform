function MarketSection({
  stocks,
  formatCurrency,
  onInvest,
}) {

  return (
    <section className="portfolio-section">

      <div className="section-heading">

        <div>

          <h2>
            Market
          </h2>

          <p>
            Live prices from selected
            Nifty 50 stocks.
          </p>

        </div>

      </div>


      {stocks.length === 0 ? (

        <div className="portfolio-empty">

          <div className="portfolio-empty-icon">
            ◇
          </div>

          <h3>
            No market data
          </h3>

          <p>
            Stock market data is
            currently unavailable.
          </p>

        </div>

      ) : (

        <div className="stocks-grid">

          {stocks.map((stock) => {

            const positive =
              Number(
                stock.change
              ) >= 0;

            const symbol =
              stock.symbol.replace(
                ".NS",
                ""
              );

            return (

              <div
                className="market-stock-card"
                key={stock.symbol}
              >

                {/* TOP */}

                <div className="market-stock-top">

                  <div className="market-stock-name">

                    <div className="market-stock-avatar">
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


                  <span
                    className={
                      positive
                        ? "market-positive"
                        : "market-negative"
                    }
                  >

                    {positive
                      ? "+"
                      : ""}

                    {Number(
                      stock.change || 0
                    ).toFixed(2)}

                    %

                  </span>

                </div>


                {/* PRICE */}

                <div className="market-stock-price">

                  ₹
                  {formatCurrency(
                    stock.price
                  )}

                </div>


                {/* INVEST */}

                <button
                  className="invest-button"
                  onClick={() =>
                    onInvest(stock)
                  }
                >
                  Invest
                </button>

              </div>

            );

          })}

        </div>

      )}

    </section>
  );
}

export default MarketSection;