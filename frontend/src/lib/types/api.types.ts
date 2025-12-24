// User interface matching backend response
export interface User {
	id: number;
	name: string;
	email: string;
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
}

// Generic API response wrapper
export interface ApiResponse<T = any> {
	success: boolean;
	message: string;
	data: T;
}

// API error response
export interface ApiError {
	success: false;
	message: string;
	errors?: Record<string, string[]>;
}

// Auth responses
export interface AuthData {
	user: User;
	token: string;
}

export interface LoginResponse extends ApiResponse<AuthData> {
	data: AuthData;
}

export interface RegisterResponse extends ApiResponse<AuthData> {
	data: AuthData;
}

export interface MeResponse extends ApiResponse<{ user: User }> {
	data: {
		user: User;
	};
}

// AI responses
export interface AiDemoData {
	prompt: string;
	response: string;
	provider: string;
}

export interface AiDemoResponse extends ApiResponse<AiDemoData> {
	data: AiDemoData;
}

// Generic request types
export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export interface AiDemoRequest {
	prompt: string;
}
