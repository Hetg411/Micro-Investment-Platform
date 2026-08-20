import {
  useEffect,
  useMemo,
  useState,
} from "react";

import API from "../services/api";

import PortfolioSummary from "../components/portfolio/PortfolioSummary";
import HoldingsTable from "../components/portfolio/HoldingsTable";
import MarketSection from "../components/portfolio/MarketSection";
import InvestmentHistory from "../components/portfolio/InvestmentHistory";
import InvestModal from "../components/portfolio/InvestModal";

import "../components/portfolio/portfolio.css";


function Portfolio() {

  // =========================================
  // DATA STATE
  // =========================================

  const [portfolio, setPortfolio] =
    useState([]);

  const [stocks, setStocks] =
    useState([]);

  const [investments, setInvestments] =
    useState([]);

  const [balance, setBalance] =
    useState(0);


  // =========================================
  // UI STATE
  // =========================================

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================================
  // INVESTMENT MODAL
  // =========================================

  const [showInvestModal, setShowInvestModal] =
    useState(false);

  const [selectedStock, setSelectedStock] =
    useState(null);

  const [investmentAmount, setInvestmentAmount] =
    useState("");

  const [investing, setInvesting] =
    useState(false);


  // =========================================
  // FETCH DATA
  // =========================================

  useEffect(() => {
    fetchPortfolioData();
  }, []);


  const fetchPortfolioData = async () => {

    try {

      setLoading(true);
      setError("");

      const [
        portfolioResponse,
        balanceResponse,
        stocksResponse,
        investmentResponse,
      ] = await Promise.all([

        API.get(
          "/portfolio/portfolio"
        ),

        API.get(
          "/portfolio/awailableBalance"
        ),

        API.get(
          "/portfolio/stocks/data"
        ),

        API.get(
          "/portfolio/investment"
        ),

      ]);


      setPortfolio(
        portfolioResponse.data.data || []
      );

      setBalance(
        balanceResponse.data.data?.balance || 0
      );

      setStocks(
        stocksResponse.data.data || []
      );

      setInvestments(
        investmentResponse.data.data || []
      );

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load portfolio"
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================
  // CURRENCY
  // =========================================

  const formatCurrency = (value) => {

    return Number(
      value || 0
    ).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    );

  };


  // =========================================
  // PORTFOLIO CALCULATIONS
  // =========================================

  const totalInvested = useMemo(() => {

    return portfolio.reduce(
      (total, item) =>
        total +
        Number(
          item.totalInvested || 0
        ),
      0
    );

  }, [portfolio]);


  const currentValue = useMemo(() => {

    return portfolio.reduce(
      (total, item) =>
        total +
        Number(
          item.currentValue || 0
        ),
      0
    );

  }, [portfolio]);


  const totalProfitLoss =
    currentValue -
    totalInvested;


  const totalProfitLossPercentage =
    totalInvested > 0
      ? (
          totalProfitLoss /
          totalInvested
        ) * 100
      : 0;


  // =========================================
  // OPEN INVEST MODAL
  // =========================================

  const openInvestModal = (stock) => {

    setSelectedStock(stock);

    setInvestmentAmount("");

    setShowInvestModal(true);

    setError("");

  };


  // =========================================
  // CLOSE INVEST MODAL
  // =========================================

  const closeInvestModal = () => {

    setShowInvestModal(false);

    setSelectedStock(null);

    setInvestmentAmount("");

  };


  // =========================================
  // HANDLE INVESTMENT
  // =========================================

  const handleInvestment = async (e) => {

    e.preventDefault();

    if (!selectedStock) {
      return;
    }


    const amount =
      Number(investmentAmount);


    // Validate amount

    if (!amount || amount <= 0) {

      setError(
        "Investment amount must be greater than 0."
      );

      return;

    }


    // Validate balance

    if (amount > balance) {

      setError(
        "Investment amount is greater than your available balance."
      );

      return;

    }


    try {

      setInvesting(true);

      setError("");


      await API.post(
        "/portfolio/investment",
        {
          stockSymbol:
            selectedStock.symbol,

          amount,
        }
      );


      closeInvestModal();


      // Refresh all portfolio data

      await fetchPortfolioData();

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
          "Investment failed"
      );

    } finally {

      setInvesting(false);

    }
  };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <div className="portfolio-loading">
        Loading portfolio...
      </div>
    );

  }


  // =========================================
  // UI
  // =========================================

  return (

    <div className="portfolio-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="page-heading">

        <div>

          <h1>
            Portfolio
          </h1>

          <p>
            Track your investments and
            discover new opportunities.
          </p>

        </div>


        <div className="portfolio-balance">

          <span>
            Available to Invest
          </span>

          <strong>
            ₹{formatCurrency(balance)}
          </strong>

        </div>

      </div>


      {/* =====================================
          ERROR
      ===================================== */}

      {error && (

        <div className="page-error">
          {error}
        </div>

      )}


      {/* =====================================
          SUMMARY
      ===================================== */}

      <PortfolioSummary

        totalInvested={
          totalInvested
        }

        currentValue={
          currentValue
        }

        totalProfitLoss={
          totalProfitLoss
        }

        totalProfitLossPercentage={
          totalProfitLossPercentage
        }

        formatCurrency={
          formatCurrency
        }

      />


      {/* =====================================
          HOLDINGS
      ===================================== */}

      <HoldingsTable

        portfolio={
          portfolio
        }

        formatCurrency={
          formatCurrency
        }

      />


      {/* =====================================
          MARKET
      ===================================== */}

      <MarketSection

        stocks={
          stocks
        }

        formatCurrency={
          formatCurrency
        }

        onInvest={
          openInvestModal
        }

      />


      {/* =====================================
          INVESTMENT HISTORY
      ===================================== */}

      <InvestmentHistory

        investments={
          investments
        }

        formatCurrency={
          formatCurrency
        }

      />


      {/* =====================================
          INVEST MODAL
      ===================================== */}

      <InvestModal

        show={
          showInvestModal
        }

        selectedStock={
          selectedStock
        }

        balance={
          balance
        }

        investmentAmount={
          investmentAmount
        }

        investing={
          investing
        }

        formatCurrency={
          formatCurrency
        }

        onAmountChange={
          setInvestmentAmount
        }

        onSubmit={
          handleInvestment
        }

        onClose={
          closeInvestModal
        }

      />

    </div>

  );
}

export default Portfolio;