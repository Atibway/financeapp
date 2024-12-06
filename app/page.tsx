"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const demoIncomes = [
  { id: "1", amount: 1500, source: "Salary", description: "Monthly salary", isRecurring: true, recurringFrequency: "monthly" },
  { id: "2", amount: 200, source: "Freelancing", description: "Web development project", isRecurring: false },
];

const demoExpenses = [
  { id: "1", amount: 300, category: "Rent", description: "Monthly apartment rent", isRecurring: true, recurringFrequency: "monthly" },
  { id: "2", amount: 50, category: "Groceries", description: "Weekly groceries", isRecurring: true, recurringFrequency: "weekly" },
];

const demoBudgets = [
  {
    id: "1",
    period: "monthly",
    totalLimit: 1000,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    categories: [{ category: "Rent", limit: 500 }, { category: "Groceries", limit: 200 }],
  },
];

export default function DashboardPage() {
  const [incomes, setIncomes] = useState(demoIncomes);
  const [expenses, setExpenses] = useState(demoExpenses);
  const [budgets, setBudgets] = useState(demoBudgets);

  useEffect(() => {
    // Fetch real data here if needed
  }, []);

  const incomeData = {
    labels: incomes.map((income) => income.source),
    datasets: [
      {
        label: "Income",
        data: incomes.map((income) => income.amount),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const expenseData = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        label: "Expense",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const budgetData = {
    labels: budgets[0].categories.map((category) => category.category),
    datasets: [
      {
        label: "Budget Limit",
        data: budgets[0].categories.map((category) => category.limit),
        backgroundColor: "rgba(153, 102, 255, 0.8)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-green-700">Dashboard</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Income Chart */}
        <Card className="shadow-md rounded-lg bg-white hover:shadow-lg transition-transform transform hover:scale-105">
          <CardHeader className="p-6 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-t-lg">
            <CardTitle className="text-xl font-semibold">Income Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Bar data={incomeData} />
          </CardContent>
        </Card>

        {/* Expense Chart */}
        <Card className="shadow-md rounded-lg bg-white hover:shadow-lg transition-transform transform hover:scale-105">
          <CardHeader className="p-6 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-t-lg">
            <CardTitle className="text-xl font-semibold">Expense Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Bar data={expenseData} />
          </CardContent>
        </Card>

        {/* Budget Chart */}
        <Card className="shadow-md rounded-lg bg-white hover:shadow-lg transition-transform transform hover:scale-105">
          <CardHeader className="p-6 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-xl font-semibold">Budget Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Bar data={budgetData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
