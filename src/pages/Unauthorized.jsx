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
};

const UnauthorizedPage = ({}) => {
  return (
    <div style={container}>
      <div style={card}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div
            style={{ background: "#fff5f5", borderRadius: "50%", padding: 10 }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L2.52 17.36A2 2 0 004.18 20h15.64a2 2 0 001.66-2.64L13.71 3.86a2 2 0 00-3.42 0z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </div>

          <div>
            <h1 style={{ margin: 0, fontSize: 22 }}>Acceso caducado</h1>
            <p style={{ margin: 0, color: "#6b7280", marginTop: 6 }}>
              Tu sesión ha expirado o el token no es válido.
              <br />
              Para continuar, saca la cámara de tu móvil y vuelve a escanear el
              QR del restaurante.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ marginBottom: 10 }}>
            <strong>Paso 1:</strong> Abre la cámara de tu móvil.
          </div>
          <div>
            <strong>Paso 2:</strong> Escanea el código QR que tienes en la mesa.
          </div>
          <div style={{ marginTop: 10 }}>
            <strong>Paso 3:</strong> Espera la confirmación: se generará un
            nuevo acceso automáticamente.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
