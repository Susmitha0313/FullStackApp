import React, { useState } from "react";
import "./CSS/counter.css";
import Header from "./Header";
const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <>
      <Header />
      <div className="counter-page">
        <div className="counter-container">
          <h1> Counter</h1>
          <div className="counter-box">
            <p className="counter-display">{count}</p>
            <div className="button-group">
              <button className="counter-button" onClick={increment}>
                +
              </button>
              <button className="counter-button" onClick={decrement}>
                -
              </button>
              <button className="counter-button reset-button" onClick={reset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counter;
