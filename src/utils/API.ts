const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("Configuration Error: VITE_API_URL is not defined in your .env file.");
}

export default API_URL;
