import { useState } from "react";
import { GroceryItem } from "../types/GroceryItem";
import React from 'react';
interface Props {
  onAddItem: (item: GroceryItem) => void;
}

export default function GroceryForm({ onAddItem }: Props) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    const newItem: GroceryItem = {
      id: crypto.randomUUID(),
      name,
      quantity,
      price,
    };

    onAddItem(newItem);
    setName("");
    setQuantity(1);
    setPrice(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        step="0.01"
        min="0"
      />
      <button type="submit">Add Item</button>
    </form>
  );
}
