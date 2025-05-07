import React, { useState } from 'react';

interface Props {
  onSetBudget: (amount: number) => void;
}

export default function BudgetInput({ onSetBudget }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budget = parseFloat(input);
    if (!isNaN(budget) && budget >= 0) {
      onSetBudget(budget);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your grocery budget:</label>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 100"
        min="0"
        step="0.01"
        required
      />
      <button type="submit" name="Set Budget">Set Budget</button>
    </form>
  );
}
