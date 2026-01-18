import { useState } from "react";

const Counter: React.FC<{ initialCount?: number, initialLoading?: boolean }> =
  ({ initialCount = 0, initialLoading = false }) => {
  const [count, setCount] = useState(initialCount)
  const [loading, setLoading] = useState(initialLoading);

  const updateCount = (value: number) => {
    setTimeout(() => {
      setCount(value);
      setLoading(false);
    }, 500);
    setLoading(true);
  };

  return (
    <div className="card">
      <button disabled={loading || count < 1} onClick={() => updateCount(count - 1)}>
        Decrease
      </button>
      <span style={{ margin: '20px' }}>{loading ? "Calculating ..." : "count is " + count}</span>
      <button disabled={loading} onClick={() => updateCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

export default Counter;