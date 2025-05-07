import React, { useState } from 'react';

interface Props {
  onReset: () => void;
}

export default function ResetButton({ onReset }: Props) {
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
    } else {
      onReset();
      setConfirming(false);
    }
  };

  const handleCancel = () => {
    setConfirming(false);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      {confirming ? (
        <>
          <p>Are you sure you want to reset your budget and items?</p>
          <button onClick={handleClick} style={{ backgroundColor: '#e74c3c' }}>Yes, Reset</button>
          <button onClick={handleCancel} style={{ marginLeft: '1rem' }}>Cancel</button>
        </>
      ) : (
        <button onClick={handleClick} style={{ backgroundColor: '#e67e22' }}>
          🔄 Reset Budget & Items
        </button>
      )}
    </div>
  );
}
