export function generateUniqueId() {
  return crypto.randomUUID();
}

export function getDatabaseUrl() {
  const env = import.meta.env.VITE_ENV;

  if (env === "production") {
    return "https://myleanbite-api-rest.onrender.com";
  } else if (env === "staging") {
    return "localhost:8080";
  } else {
    return "localhost:8080";
  }
}
