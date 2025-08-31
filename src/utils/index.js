export function generateUniqueId() {
  return crypto.randomUUID();
}

export function getHubUrl() {
  const env = import.meta.env.VITE_ENV;

  if (env === "production") {
    return "https://api.myleanbite.com";
  } else if (env === "staging") {
    return "http://localhost:8080";
  } else {
    return "http://localhost:8080";
  }
}

export function getHubBaseUrl() {
  const env = import.meta.env.VITE_ENV;

  if (env === "production") {
    return "api.myleanbite.com";
  } else if (env === "staging") {
    return "localhost:8080";
  } else {
    return "localhost:8080";
  }
}

export const getWebSocketProtocol = () => {
  return window.location.protocol === "https:" ? "wss" : "ws";
};
