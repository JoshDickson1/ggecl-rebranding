import { supabase } from "@/lib/supabase";

export class APIError extends Error {
  code: string;

  constructor(name: string, message: string, code: string) {
    super(message);
    this.name = name || 'APIError';
    this.code = code;
  }
}

export class APIConfig {
  static baseURL = import.meta.env.VITE_API_URL;

  static async getAuthToken(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      return session.access_token;
    }
    return null;
  }

  static async fetchWithRetry(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const url = `${this.baseURL}/api${endpoint}`;

    // Get fresh token from Supabase
    const token = await this.getAuthToken();

    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      };
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = errorData.error || {};
      
      throw new APIError(
        error.name || 'APIError', 
        error.message || `HTTP ${response.status}: ${response.statusText}`,
        error.code || `HTTP_${response.status}`
      );
    }

    return response;
  }
}