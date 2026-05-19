import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from './AuthContext';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchExpenses();
      fetchBudget();
    } else {
      setExpenses([]);
      setBudget(null);
    }
  }, [isAuthenticated]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/expenses');
      setExpenses(res.data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const res = await api.post('/expenses', expenseData);
      setExpenses([res.data, ...expenses]);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error adding expense' };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(e => e._id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error deleting expense' };
    }
  };

  const fetchBudget = async () => {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
      const res = await api.get(`/budgets/${currentMonth}`);
      setBudget(res.data);
    } catch (error) {
      console.error("Failed to fetch budget", error);
    }
  };

  const updateBudget = async (budgetData) => {
    try {
      const res = await api.post('/budgets', budgetData);
      setBudget(res.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error updating budget' };
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, budget, loading, addExpense, deleteExpense, updateBudget }}>
      {children}
    </ExpenseContext.Provider>
  );
};
