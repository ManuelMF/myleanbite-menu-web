import React from "react";
import './../../styles/globals.css'; 

const ExtraSelector = ({ extras, onSelect }) => {
  return (
    <div className="extra-selector">
      <h4>Extras</h4>
      <ul>
        {extras.map((extra) => (
          <li key={extra.productId}>
            <button className="extra-btn" onClick={() => onSelect(extra)}>
              {extra.name} (+${extra.price})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExtraSelector;
