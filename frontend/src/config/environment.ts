import { jwtDecode } from "jwt-decode";


export interface Environment {
    mode: 'development' | 'production';
    userData: DecodedToken;
    apiUrl: string;
    token: string;
    basename: string;
    timeout: number;
  }

  interface DecodedToken {
    id?: string | number;
    exp?: number;
  }


  const decoded_token: DecodedToken = (() => {
    const token = localStorage.getItem("token");
    if (!token) return {};
    try {
      const decodedToken:any = jwtDecode(token);
      return {
        ...decodedToken,
      };
    } catch (error) {
      console.warn('FAILED TO DECODE JWT TOKEN: ', error);
      return {};
    }
  })();


export const environment: Environment = {
    mode: import.meta.env.MODE as 'development' | 'production',
    userData: decoded_token,

    apiUrl: import.meta.env.VITE_API_URL,
    basename: import.meta.env.VITE_BASE_URL || '',
    timeout: 0,

    token: "Bearer " + localStorage.getItem("token"),
}; 