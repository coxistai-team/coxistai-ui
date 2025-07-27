import React, { useState, useEffect } from "react";

const PRELAUNCH_KEY = "prelaunch_access_granted";
const isPrelaunch = import.meta.env.VITE_PRELAUNCH === "true";
const ENV_PASSWORD = import.meta.env.VITE_PRELAUNCH_PASSWORD;

const PasswordGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // If not in prelaunch mode, render children directly
  if (!isPrelaunch) return <>{children}</>;

  // If password is not set, block access and show warning
  if (!ENV_PASSWORD || ENV_PASSWORD === "") {
    return (
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        background: "#F5F5DC", color: "#2A2520", zIndex: 99999, display: "flex",
        alignItems: "center", justifyContent: "center", flexDirection: "column"
      }}>
        <h2 style={{ fontSize: 28, marginBottom: 16 }}>🔒 Private Access</h2>
        <div style={{ color: "#C85A5A", fontSize: 18, marginBottom: 16 }}>
          <b>Error:</b> No prelaunch password set in env.<br />
          Set <code>VITE_PRELAUNCH_PASSWORD</code> in your .env for security.
        </div>
        <div style={{ marginTop: 32, color: "#6B6258" }}>
          This site is private. Please contact us for access.
        </div>
      </div>
    );
  }

  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem(PRELAUNCH_KEY) === "true") {
      setUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ENV_PASSWORD) {
      localStorage.setItem(PRELAUNCH_KEY, "true");
      setUnlocked(true);
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "#F5F5DC", color: "#2A2520", zIndex: 99999, display: "flex",
      alignItems: "center", justifyContent: "center", flexDirection: "column"
    }}>
      <h2 style={{ fontSize: 28, marginBottom: 16 }}>🔒 Private Access</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="password"
          placeholder="Enter access password"
          value={input}
          onChange={e => { setInput(e.target.value); setError(""); }}
          style={{ 
            padding: 12, 
            fontSize: 18, 
            borderRadius: 8, 
            border: "2px solid #D1C7B8",
            background: "#FAFAF7",
            color: "#2A2520"
          }}
        />
        <button type="submit" style={{
          padding: "10px 24px", 
          fontSize: 18, 
          borderRadius: 8, 
          background: "linear-gradient(135deg, #B8956A 0%, #D4A574 100%)", 
          color: "#FCFCFA", 
          border: "none",
          fontWeight: 600,
          cursor: "pointer"
        }}>
          Unlock
        </button>
        {error && <div style={{ color: "#C85A5A", marginTop: 8 }}>{error}</div>}
      </form>
      <div style={{ marginTop: 32, color: "#6B6258" }}>
        This site is private. Please contact us for access.
      </div>
    </div>
  );
};

export default PasswordGate;