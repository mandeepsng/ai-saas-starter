/**
 * Centralized application configuration
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// App Constants
export const APP_NAME = 'AI SaaS Starter';
export const APP_VERSION = '1.0.0';

// Token Configuration
export const TOKEN_KEY = 'auth_token';

// Route paths
export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	DASHBOARD: '/app/dashboard',
	AI_DEMO: '/app/ai',
	PROFILE: '/app/profile'
} as const;

// Environment checks
export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;
