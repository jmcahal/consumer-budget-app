import { useState, useEffect } from "react";
import GroceryForm from "./components/GroceryForm.tsx";
import GroceryList from "./components/GroceryList.tsx";
import TotalCost from "./components/TotalCost.tsx";
import { GroceryItem } from "./types/GroceryItem";
import React from "react";
import BudgetInput from "./components/BudgetInput.tsx";
import "./App.css";
import ResetButton from './components/ResetButton.tsx';

function App() {
  const [budget, setBudget] = useState<number | null>(() => {
    const stored = localStorage.getItem('budget');
    return stored ? parseFloat(stored) : null;
  });
  
  const [items, setItems] = useState<GroceryItem[]>(() => {
    const stored = localStorage.getItem('items');
    return stored ? JSON.parse(stored) : [];
  });
  
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (budget !== null) {
      localStorage.setItem('budget', budget.toString());
    }
  }, [budget]);
  
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = (item: GroceryItem) => {
    setItems((prev) => [...prev, item]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  
  const editItem = (updated: GroceryItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };
  const remaining = budget !== null ? budget - total : null;
  const resetApp = () => {
    localStorage.clear();
    setBudget(null);
    setItems([]);
  };
  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <h1>Grocery Budgeting Tool</h1>
      <BudgetInput onSetBudget={setBudget} />
      {budget !== null && (
        <div>
          <p
            style={{ color: total > (budget ?? Infinity) ? "red" : undefined }}
          >
            <strong>Total:</strong> ${total.toFixed(2)}
          </p>
          <p style={{ color: remaining! < 0 ? "red" : undefined }}>
            <strong>Remaining:</strong> ${remaining!.toFixed(2)}
          </p>
          <div className="progress-container">
            <div
              className={`progress-bar ${remaining! < 0 ? "over" : ""}`}
              style={{ width: `${Math.min((total / budget) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
      <GroceryForm onAddItem={addItem} />
      <GroceryList items={items} onDelete={deleteItem} onEdit={editItem} />
      <TotalCost items={items} />
      <ResetButton onReset={resetApp} />

    </div>
  );
}

export default App;
