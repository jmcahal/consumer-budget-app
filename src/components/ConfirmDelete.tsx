import React from 'react';

interface Props {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDelete({ itemName, onConfirm, onCancel }: Props) {
  return (
    <div className="confirm-delete">
      <p>Delete <strong>{itemName}</strong>?</p>
      <div className="confirm-buttons">
        <button onClick={onConfirm} className="confirm">Yes</button>
        <button onClick={onCancel} className="cancel">Cancel</button>
      </div>
    </div>
  );
}
