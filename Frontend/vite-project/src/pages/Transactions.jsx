import { useEffect, useState } from "react";
import API from "../services/api";

import TransactionFilters from "../components/Transactions/TransactionFilters";
import TransactionTable from "../components/Transactions/TransactionTable";
import TransactionModal from "../components/Transactions/TransactionModal";
import Pagination from "../components/Transactions/Pagination";
import "../components/Transactions/transactions.css";

const initialForm = {
  amount: "",
  category: "Food",
  date: "",
  roundUp: "",
  remarks: "",
};

function Transactions() {

  // ================================
  // TRANSACTION STATE
  // ================================

  const [transactions, setTransactions] = useState([]);

  // ================================
  // FILTER STATE
  // ================================

  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ================================
  // PAGINATION STATE
  // ================================

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ================================
  // UI STATE
  // ================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState(null);

  // ================================
  // FORM STATE
  // ================================

  const [form, setForm] = useState(initialForm);


  // ================================
  // FETCH TRANSACTIONS
  // ================================

  useEffect(() => {
    fetchTransactions();
  }, [
    page,
    category,
    startDate,
    endDate,
  ]);


  const fetchTransactions = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await API.get(
        "/transactions/",
        {
          params: {
            page,
            limit: 10,
            category,
            startDate,
            endDate,
          },
        }
      );

      setTransactions(
        response.data.transactions || []
      );

      setTotalPages(
        response.data.totalPages || 1
      );

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load transactions"
      );

    } finally {

      setLoading(false);

    }
  };


  // ================================
  // FORM FUNCTIONS
  // ================================

  const resetForm = () => {

    setForm(initialForm);

    setEditingTransaction(null);
  };


  const openAddModal = () => {

    resetForm();

    setShowModal(true);
  };


  const openEditModal = (transaction) => {

    setEditingTransaction(transaction);

    setForm({

      amount: transaction.amount,

      category: transaction.category,

      date: transaction.date
        ? new Date(transaction.date)
            .toISOString()
            .split("T")[0]
        : "",

      roundUp: transaction.roundUp,

      remarks: transaction.remarks || "",
    });

    setShowModal(true);
  };


  const closeModal = () => {

    setShowModal(false);

    resetForm();
  };


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // ================================
  // ADD / UPDATE
  // ================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setError("");

      const data = {

        amount: Number(form.amount),

        category: form.category,

        date: form.date,

        roundUp: Number(form.roundUp),

        remarks: form.remarks,
      };


      if (editingTransaction) {

        await API.put(
          `/transactions/updateTransaction/${editingTransaction._id}`,
          data
        );

      } else {

        await API.post(
          "/transactions/addTransaction",
          data
        );

      }


      closeModal();

      fetchTransactions();

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to save transaction"
      );
    }
  };


  // ================================
  // DELETE
  // ================================

  const deleteTransaction = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
      return;
    }


    try {

      setError("");

      await API.delete(
        `/transactions/delete/transaction/${id}`
      );

      fetchTransactions();

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to delete transaction"
      );
    }
  };


  // ================================
  // FILTERS
  // ================================

  const clearFilters = () => {

    setCategory("");
    setStartDate("");
    setEndDate("");

    setPage(1);
  };


  const handleCategoryChange = (value) => {

    setCategory(value);
    setPage(1);
  };


  const handleStartDateChange = (value) => {

    setStartDate(value);
    setPage(1);
  };


  const handleEndDateChange = (value) => {

    setEndDate(value);
    setPage(1);
  };


  // ================================
  // DATE FORMATTER
  // ================================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // ================================
  // PREPARE TRANSACTIONS
  // ================================

  const formattedTransactions =
    transactions.map((transaction) => ({
      ...transaction,
      formattedDate: formatDate(
        transaction.date
      ),
    }));


  return (

    <div className="transactions-page">


      {/* =================================
          PAGE HEADER
      ================================= */}

      <div className="page-heading">

        <div>

          <h1>
            Transactions
          </h1>

          <p>
            Track your spending and automatic
            round-up savings.
          </p>

        </div>


        <button
          className="primary-action"
          onClick={openAddModal}
        >
          + Add Transaction
        </button>

      </div>


      {/* =================================
          ERROR
      ================================= */}

      {error && (

        <div className="page-error">
          {error}
        </div>

      )}


      {/* =================================
          FILTERS
      ================================= */}

      <TransactionFilters

        category={category}

        startDate={startDate}

        endDate={endDate}

        onCategoryChange={
          handleCategoryChange
        }

        onStartDateChange={
          handleStartDateChange
        }

        onEndDateChange={
          handleEndDateChange
        }

        onClear={clearFilters}

      />


      {/* =================================
          TRANSACTION TABLE
      ================================= */}

      <div className="transaction-table-card">

        <div className="table-header">

          <div>

            <h3>
              All Transactions
            </h3>

            <p>
              Your transaction history
            </p>

          </div>

        </div>


        {loading ? (

          <div className="table-state">
            Loading transactions...
          </div>

        ) : formattedTransactions.length === 0 ? (

          <div className="table-state">

            <div className="empty-icon">
              ₹
            </div>

            <h3>
              No transactions found
            </h3>

            <p>
              Add your first transaction to
              start tracking your savings.
            </p>

            <button
              className="primary-action"
              onClick={openAddModal}
            >
              + Add Transaction
            </button>

          </div>

        ) : (

          <TransactionTable

            transactions={
              formattedTransactions
            }

            onEdit={
              openEditModal
            }

            onDelete={
              deleteTransaction
            }

          />

        )}

      </div>


      {/* =================================
          PAGINATION
      ================================= */}

      {!loading &&
        formattedTransactions.length > 0 && (

          <Pagination

            page={page}

            totalPages={totalPages}

            onPrevious={() =>
              setPage(
                (previous) =>
                  previous - 1
              )
            }

            onNext={() =>
              setPage(
                (previous) =>
                  previous + 1
              )
            }

          />

        )}


      {/* =================================
          MODAL
      ================================= */}

      <TransactionModal

        show={showModal}

        editingTransaction={
          editingTransaction
        }

        form={form}

        onChange={handleChange}

        onSubmit={handleSubmit}

        onClose={closeModal}

      />

    </div>
  );
}

export default Transactions;