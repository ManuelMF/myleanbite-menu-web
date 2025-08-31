export function generateUniqueId() {
  return crypto.randomUUID();
}

export function getHubUrl() {
  const env = import.meta.env.VITE_ENV;

  if (env === "production") {
    return "https://api.myleanbite.com";
  } else if (env === "preproduction") {
    return "http://localhost:8080";
  } else {
    return "http://localhost:8080";
  }
}

export function getHubBaseUrl() {
  const env = import.meta.env.VITE_ENV;

  if (env === "production") {
    return "api.myleanbite.com";
  } else if (env === "preproduction") {
    return "localhost:8080";
  } else {
    return "localhost:8080";
  }
}

export function getDashboardApiUrl() {
  const env = import.meta.env.VITE_ENV;

  if (env === "production") {
    return "https://dashboard.api.myleanbite.com";
  } else if (env === "preproduction") {
    return "https://dashboard.api.myleanbite.com";
  } else {
    return "http://localhost:8001";
  }
}

export const getWebSocketProtocol = () => {
  return window.location.protocol === "https:" ? "wss" : "ws";
};
