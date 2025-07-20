import React from "react";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "sans-serif",
        backgroundColor: "#0a0a0a",
        color: "#fff",
      }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            body, html, #root {
              background: black;
              color: white;
              height: 100%;
              margin: 0;
              overflow: hidden;
            }
            .desktop-only {
              display: none !important;
            }
            .mobile-warning {
              display: flex !important;
              font-size: 1.2rem;
              padding: 2rem;
              text-align: center;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
          }

          @media (min-width: 769px) {
            .mobile-warning {
              display: none !important;
            }
            .desktop-only {
              display: flex !important;
            }
          }
        `}
      </style>

      <div className="mobile-warning">
        🚫 This demo is desktop-only. Please visit from a desktop browser with Keplr installed.
      </div>

      <div className="desktop-only">
        <h1 style={{ marginBottom: "2rem" }}>✅ Connect and Mint SoloPass</h1>
        <button
          style={{
            fontSize: "1.5rem",
            padding: "1rem 2rem",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#4e9ef7",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => alert("Mint logic goes here")}
        >
          Mint SoloPass
        </button>
      </div>
    </div>
  );
}

export default App;
