console.log("KS Design Studio: ATOMIC_BOOT_REACHED");
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("KS Design Studio: Initializing Atelier Genesis Volume [HEARTBEAT_READY]...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("KS Design Critical Error: Root element '#root' not found in DOM.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
  console.log("KS Design Studio: Interface mounted successfully.");
}