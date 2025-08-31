import React from "react";

const container = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f3f4f6",
  padding: "16px",
};

const card = {
  maxWidth: "720px",
  width: "100%",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  padding: "28px",
  color: "#1f2937",
  textAlign: "center",
};

const NotFoundPage = ({ onGoHome, onLogout }) => {
  return (
    <div style={container}>
      <div style={card}>
        <div style={{ marginBottom: 16 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </svg>
        </div>

        <h1 style={{ margin: 0, fontSize: 26 }}>404 - Página no encontrada</h1>
        <p style={{ marginTop: 8, color: "#6b7280" }}>
          La página que buscas no existe o fue movida. Verifica la URL o vuelve
          al inicio.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
