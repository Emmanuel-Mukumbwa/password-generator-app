import React from 'react';

const StrengthMeter = ({ strength }) => {
  const labels = ['Very Weak', 'Weak', 'Strong', 'Very Strong'];
  const colors = ['#ff4444', '#ffbb33', '#00C851', '#00C851'];
  
  return (
    <div className="strength-meter">
      <div className="bars">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            className={`bar ${i <= strength ? 'active' : ''}`}
            style={{ backgroundColor: i <= strength ? colors[strength] : '' }}
          />
        ))}
      </div>
      <span>{labels[strength]}</span>
    </div>
  );
};

export default StrengthMeter;