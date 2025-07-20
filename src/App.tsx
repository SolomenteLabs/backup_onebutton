import React from "react";

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

function App() {
  if (isMobile) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>🔒 Desktop Only</h2>
        <p>This demo requires a desktop browser with the Keplr extension.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🚀 Mint Coreum Smart Token</h1>
      {/* Your existing mint button and logic here */}
    </div>
  );
}

export default App;
