import { APP_CONFIG } from "../config/constants";

// Tipos para las respuestas de la API
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface SignupResponse extends LoginResponse {}

// Clase para manejar las peticiones a la API
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = APP_CONFIG.api.baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = localStorage.getItem(APP_CONFIG.storage.authToken);

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Métodos de autenticación
  async login(email: string, password: string): Promise<LoginResponse> {
    return this.request<LoginResponse>(APP_CONFIG.api.endpoints.auth.signin, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<SignupResponse> {
    return this.request<SignupResponse>(APP_CONFIG.api.endpoints.auth.signup, {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
  }

  async getMe() {
    return this.request(APP_CONFIG.api.endpoints.auth.me);
  }

  // Método para limpiar el token
  clearAuth() {
    localStorage.removeItem(APP_CONFIG.storage.authToken);
  }

  // Método para establecer el token
  setAuthToken(token: string) {
    localStorage.setItem(APP_CONFIG.storage.authToken, token);
  }
}

// Instancia singleton del cliente API
export const apiClient = new ApiClient();
