import {
  useEffect,
  useMemo,
  useState,
} from "react";

import API from "../services/api";

import GrowthFilters from "../components/growth/GrowthFilters";
import GrowthSummary from "../components/growth/GrowthSummary";
import GrowthChart from "../components/growth/GrowthChart";
import DailyBreakdown from "../components/growth/DailyBreakdown";

import "../components/growth/growth.css";


function RoundUpGrowth() {

  // =========================================
  // CURRENT DATE
  // =========================================

  const currentDate = new Date();


  // =========================================
  // FILTER STATE
  // =========================================

  const [month, setMonth] = useState(
    currentDate.getMonth() + 1
  );

  const [year, setYear] = useState(
    currentDate.getFullYear()
  );


  // =========================================
  // DATA STATE
  // =========================================

  const [growthData, setGrowthData] =
    useState({});


  // =========================================
  // UI STATE
  // =========================================

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================================
  // FETCH GROWTH DATA
  // =========================================

  useEffect(() => {
    fetchGrowth();
  }, [month, year]);


  const fetchGrowth = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await API.get(
        "/growth",
        {
          params: {
            month,
            year,
          },
        }
      );

      setGrowthData(
        response.data.data || {}
      );

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load growth data"
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================
  // DAYS IN SELECTED MONTH
  // =========================================

  const daysInMonth = new Date(
    year,
    month,
    0
  ).getDate();


  // =========================================
  // DAILY DATA
  // =========================================

  const dailyData = useMemo(() => {

    const result = [];

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {

      result.push({
        day,

        amount: Number(
          growthData[day] || 0
        ),
      });

    }

    return result;

  }, [
    growthData,
    daysInMonth,
  ]);


  // =========================================
  // TOTAL SAVED
  // =========================================

  const totalSaved = useMemo(() => {

    return dailyData.reduce(
      (total, item) =>
        total + item.amount,
      0
    );

  }, [dailyData]);


  // =========================================
  // ACTIVE SAVING DAYS
  // =========================================

  const daysWithSavings = useMemo(() => {

    return dailyData.filter(
      (item) =>
        item.amount > 0
    ).length;

  }, [dailyData]);


  // =========================================
  // AVERAGE SAVING
  // =========================================

  const averageSaving = useMemo(() => {

    return daysWithSavings > 0
      ? totalSaved /
          daysWithSavings
      : 0;

  }, [
    totalSaved,
    daysWithSavings,
  ]);


  // =========================================
  // BEST SAVING DAY
  // =========================================

  const bestDay = useMemo(() => {

    return dailyData.reduce(
      (best, item) =>
        item.amount >
        best.amount
          ? item
          : best,
      {
        day: 0,
        amount: 0,
      }
    );

  }, [dailyData]);


  // =========================================
  // MAX AMOUNT FOR CHART
  // =========================================

  const maxAmount = useMemo(() => {

    return Math.max(
      ...dailyData.map(
        (item) =>
          item.amount
      ),
      1
    );

  }, [dailyData]);


  // =========================================
  // MONTH NAME
  // =========================================

  const monthName = useMemo(() => {

    return new Date(
      year,
      month - 1,
      1
    ).toLocaleString(
      "en-IN",
      {
        month: "long",
      }
    );

  }, [
    month,
    year,
  ]);


  // =========================================
  // CURRENCY FORMATTER
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
  // MONTHS
  // =========================================

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  // =========================================
  // YEARS
  // =========================================

  const years = [];

  for (
    let y =
      currentDate.getFullYear() - 3;

    y <= currentDate.getFullYear();

    y++
  ) {

    years.push(y);

  }


  // =========================================
  // RENDER
  // =========================================

  return (

    <div className="growth-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="page-heading">

        <div>

          <h1>
            Round Up Growth
          </h1>

          <p>
            See how your small round-ups
            are growing over time.
          </p>

        </div>


        <GrowthFilters

          month={month}

          year={year}

          months={months}

          years={years}

          onMonthChange={(value) => {

            setMonth(
              Number(value)
            );

          }}

          onYearChange={(value) => {

            setYear(
              Number(value)
            );

          }}

        />

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
          CONTENT
      ===================================== */}

      {loading ? (

        <div className="growth-loading">
          Loading growth data...
        </div>

      ) : (

        <>

          {/* SUMMARY */}

          <GrowthSummary

            totalSaved={
              totalSaved
            }

            averageSaving={
              averageSaving
            }

            bestDay={
              bestDay
            }

            daysWithSavings={
              daysWithSavings
            }

            monthName={
              monthName
            }

            year={
              year
            }

            formatCurrency={
              formatCurrency
            }

          />


          {/* CHART */}

          <GrowthChart

            dailyData={
              dailyData
            }

            maxAmount={
              maxAmount
            }

            totalSaved={
              totalSaved
            }

            monthName={
              monthName
            }

            year={
              year
            }

            formatCurrency={
              formatCurrency
            }

          />


          {/* DAILY BREAKDOWN */}

          <DailyBreakdown

            dailyData={
              dailyData
            }

            daysWithSavings={
              daysWithSavings
            }

            formatCurrency={
              formatCurrency
            }

          />

        </>

      )}

    </div>

  );
}

export default RoundUpGrowth;