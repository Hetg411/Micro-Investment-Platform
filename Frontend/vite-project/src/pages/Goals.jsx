import { useEffect, useState } from "react";
import API from "../services/api";

import GoalSummary from "../components/goals/GoalSummary";
import GoalsGrid from "../components/goals/GoalsGrid";
import GoalModal from "../components/goals/GoalModal";

import "../components/goals/goals.css";

const initialForm = {
  goalName: "",
  targetAmount: "",
  currentAmount: "",
};

function Goals() {
  // =================================
  // GOALS STATE
  // =================================

  const [goals, setGoals] = useState([]);
  const [totalSaved, setTotalSaved] = useState(0);

  // =================================
  // UI STATE
  // =================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =================================
  // MODAL STATE
  // =================================

  const [showModal, setShowModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  // =================================
  // FORM STATE
  // =================================

  const [form, setForm] = useState(initialForm);

  // =================================
  // FETCH GOALS
  // =================================

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      setError("");

      const [goalsResponse, savedResponse] =
        await Promise.all([
          API.get("/goals/goals"),
          API.get("/transactions/total"),
        ]);

      setGoals(
        goalsResponse.data.data || []
      );

      setTotalSaved(
        savedResponse.data.data?.totalSaved || 0
      );

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load goals"
      );

    } finally {
      setLoading(false);
    }
  };

  // =================================
  // FORM FUNCTIONS
  // =================================

  const resetForm = () => {
    setForm({
      ...initialForm,
    });

    setEditingGoal(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (goal) => {
    setEditingGoal(goal);

    setForm({
      goalName: goal.goalName,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount || 0,
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

  // =================================
  // CREATE / UPDATE GOAL
  // =================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const data = {
        goalName: form.goalName,

        targetAmount: Number(
          form.targetAmount
        ),

        currentAmount: Number(
          form.currentAmount
        ),
      };

      if (editingGoal) {
        await API.put(
          `/goals/update/goal/${editingGoal._id}`,
          data
        );
      } else {
        await API.post(
          "/goals/addgoals",
          data
        );
      }

      closeModal();

      fetchGoals();

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to save goal"
      );
    }
  };

  // =================================
  // DELETE GOAL
  // =================================

  const deleteGoal = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await API.delete(
        `/goals/delete/goal/${id}`
      );

      fetchGoals();

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to delete goal"
      );
    }
  };

  // =================================
  // CURRENCY FORMATTER
  // =================================

  const formatCurrency = (value) => {
    return Number(
      value || 0
    ).toLocaleString("en-IN");
  };

  // =================================
  // UI
  // =================================

  return (
    <div className="goals-page">

      {/* PAGE HEADER */}

      <div className="page-heading">

        <div>
          <h1>
            Financial Goals
          </h1>

          <p>
            Set goals and track your
            financial progress.
          </p>
        </div>

        <button
          className="primary-action"
          onClick={openAddModal}
        >
          + Add Goal
        </button>

      </div>


      {/* ERROR */}

      {error && (
        <div className="page-error">
          {error}
        </div>
      )}


      {/* SUMMARY */}

      {!loading && goals.length > 0 && (
        <GoalSummary
          goals={goals}
          totalSaved={totalSaved}
          formatCurrency={formatCurrency}
        />
      )}


      {/* GOALS */}

      {loading ? (

        <div className="goals-loading">
          Loading goals...
        </div>

      ) : goals.length === 0 ? (

        <div className="goals-empty">

          <div className="empty-goal-icon">
            ◎
          </div>

          <h2>
            No financial goals yet
          </h2>

          <p>
            Create your first goal and
            start tracking your progress.
          </p>

          <button
            className="primary-action"
            onClick={openAddModal}
          >
            + Create Your First Goal
          </button>

        </div>

      ) : (

        <GoalsGrid
          goals={goals}
          totalSaved={totalSaved}
          onEdit={openEditModal}
          onDelete={deleteGoal}
          formatCurrency={formatCurrency}
        />

      )}


      {/* MODAL */}

      <GoalModal
        show={showModal}
        editingGoal={editingGoal}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />

    </div>
  );
}

export default Goals; 