
{/* <> File Infromation:
    1. Imports & Constants:
        Loads environment variables and utilities (logout, cookies, etc.).
        Enables optional payload encryption based on environment (e.g., enabled in production).
    2. Axios Instance:
        Creates an Axios instance with a base URL and timeout from the environment.
        Sets default Content-Type: application/json.
    3. Request Interceptor:
        Adds Authorization header from localStorage.
        Attaches client info from cookies.
        Dynamically overrides the base URL using a custom header (USE-CUSTOM-BASE-URL).
    4. Response Interceptor:
        Handles 401 Unauthorized errors message with logout and toast notifications.
    5. Helper Function (generateApiToken):
        Generates an API token with expiry timestamps.
    6. React Wrapper (AxiosConfig):
        A simple wrapper to comply with React’s component architecture.
</> */}


import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { environment } from './environment';


// Types
interface AxiosConfigProps {
    children: React.ReactNode;
  }

// Constants for API configuration
const baseUrl = environment.apiUrl;
const timeout = environment.timeout;
const token = environment.token;


export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: timeout,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
});


axiosInstance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Check if the request has a custom base URL in the headers
    if (config.headers['USE-CUSTOM-BASE-URL']) {
        config.baseURL = config.headers['USE-CUSTOM-BASE-URL'];
      }

    // Clean up the custom header
    delete config.headers['USE-CUSTOM-BASE-URL'];

    return config;
})


// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (errorIntercept) => {
      if (errorIntercept?.response?.status === 401) {
        console.log('Session expired, redirecting to login...');
        // toast.error('Session Expired', {
        //   toastId: 'error1',
        // });
        // handleLogout();
      }
      return Promise.reject(errorIntercept);
    },
  );
  
  const AxiosConfig: React.FC<AxiosConfigProps> = ({ children }) => {
    return children;
  };
  
  export default AxiosConfig;