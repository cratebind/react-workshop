import React, { useState } from 'react';
import './App.css';

function Button({ children, onClick }) {
  return (
    <button
      className="counter-button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function App() {
  const [count, setCount] = useState(10);

  return (
    <div className="App">
      <Button
        onClick={() => setCount(count - 1)}
      >
        -
      </Button>
      <div className="counter-value">
        {count}
      </div>
      <Button
        onClick={() => setCount(count + 1)}
      >
        +
      </Button>
      <Button
        onClick={() => setCount(0)}
      >
        Reset
      </Button>
    </div>
  );
}

export default App;
