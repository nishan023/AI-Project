import React from "react";
import { useState } from "react";

const LoginInterface = () => {
  const [count, setCount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div>
      <h1>Welcome To Logged In Page</h1>
      <button
        className="w-50 bg-slate-400"
        onClick={() => {
          setShowDialog(true);
          setCount(count + 100);
        }}
      >
        Add
      </button>
      {showDialog && <p>This is my count : {count}</p>}
    </div>
  );
};

export default LoginInterface;
