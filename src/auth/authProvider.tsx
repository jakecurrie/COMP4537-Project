import React, { useState, useEffect } from 'react';
import { User, LoginData, RegisterData, AuthResponse } from './types';
import { AuthContext } from './useAuth';
import { api } from './api';
import { storage } from './storage';
import axios from 'axios';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const tokens = storage.getTokens();
      
      if (tokens) {
        try {
          const response = await api.get<{ user: User }>('/auth/me');
          setUser(response.data.user);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            storage.clearTokens();
            setError(
              error.response?.status === 401 
                ? 'Session expired. Please login again.'
                : 'Failed to restore session. Please login again.'
            );
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
  
    initializeAuth();
  }, []);

  const handleAuthResponse = (response: AuthResponse) => {
    storage.setTokens({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken
    });
    setUser(response.user);
    setError(null);
  };

  const login = async (data: LoginData) => {
    try {
      setError(null);
      const response = await api.post<AuthResponse>('/auth/login', data);
      handleAuthResponse(response.data);
    } catch (error) {
      setError('Invalid email or password');
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      const response = await api.post<AuthResponse>('/auth/register', data);
      handleAuthResponse(response.data);
    } catch (error) {
      setError('Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      storage.clearTokens();
      setUser(null);
      setError(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}