import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL || "https://kishore-s-librery.onrender.com"}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response) {
      // The request was made and the server responded with an error status code
      console.log(`Error ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
      
      // Handle specific status codes - like 401 Unauthorized
      if (error.response.status === 401) {
        // If the error message is 'Please login to access this resource', force logout
        if (error.response.data && error.response.data.message === 'Please login to access this resource') {
          localStorage.removeItem('user');
          localStorage.setItem('logout', Date.now().toString());
          window.location.href = '/login';
        }
        // Otherwise, let the loadUser function handle the proper auth state
        console.log("Authentication error - will attempt to refresh session");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log('No response received from server. Network error or CORS issue.');
    } else {
      // Something happened in setting up the request
      console.log('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    // Log the request for debugging
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.log('Request error:', error.message);
    return Promise.reject(error);
  }
);

// Export a function to test connectivity
export const testConnection = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL || "https://kishore-s-librery.onrender.com"}/api/v1/auth/login`, {
      withCredentials: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default api; 