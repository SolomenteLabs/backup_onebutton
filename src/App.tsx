import React from "react";
import SoloPassMint from "./SoloPassMint";

const App = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-slate-100">
      <div className="rounded-2xl border border-gray-300 bg-white px-12 py-10 text-center shadow-md">
        <img src="/solopass-logo.png" alt="SoloPass" className="mx-auto mb-8 w-48" />
        <h1 className="mb-4 text-2xl font-bold">Mint Your 30-Day SoloPass</h1>
        <p className="mb-6 text-gray-600">Connect Keplr & click to mint a time-limited Smart Token</p>
        <SoloPassMint />
      </div>
    </div>
  );
};

export default App;
