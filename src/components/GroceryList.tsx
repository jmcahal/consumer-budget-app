import React, { useState } from "react";
import { GroceryItem } from "../types/GroceryItem";
import ConfirmDelete from './ConfirmDelete.tsx';


interface Props {
  items: GroceryItem[];
  onDelete: (id: string) => void;
  onEdit: (item: GroceryItem) => void;
}

export default function GroceryList({ items, onDelete, onEdit }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: "", quantity: 1, price: 0 });
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleEditClick = (item: GroceryItem) => {
    setEditingId(item.id);
    setEditData({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    onEdit({ id: editingId, ...editData });
    setEditingId(null);
  };

  return (
    <ul>
      {items.map((item) =>
        editingId === item.id ? (
          <li key={item.id}>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
              <input
                type="number"
                value={editData.quantity}
                onChange={(e) =>
                  setEditData({ ...editData, quantity: Number(e.target.value) })
                }
              />
              <input
                type="number"
                value={editData.price}
                step="0.01"
                onChange={(e) =>
                  setEditData({ ...editData, price: Number(e.target.value) })
                }
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </form>
          </li>
        ) : (
          <li key={item.id}>
            <li
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                onClick={() => handleEditClick(item)}
                style={{ cursor: "pointer", flex: 1 }}
              >
                {item.name} – {item.quantity} @ ${item.price.toFixed(2)}
              </div>
              <button
                onClick={() => setPendingDeleteId(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#e74c3c",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  marginLeft: "0.5rem",
                }}
                aria-label="Delete item"
                title="Delete item"
              >
                ❌
              </button>
            </li>
          </li>
        )
      )}
      {pendingDeleteId && (
  <ConfirmDelete
    itemName={items.find(i => i.id === pendingDeleteId)?.name || ''}
    onConfirm={() => {
      onDelete(pendingDeleteId);
      setPendingDeleteId(null);
    }}
    onCancel={() => setPendingDeleteId(null)}
  />
)}

    </ul>
  );
}
