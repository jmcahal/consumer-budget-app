import { GroceryItem } from "../types/GroceryItem";
import React from 'react';
interface Props {
  items: GroceryItem[];
}

export default function TotalCost({ items }: Props) {
  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  return <h2>Total Cost: ${total.toFixed(2)}</h2>;
}
