import { ApiRequestError } from '$lib/services/api';

/**
 * Extract user-friendly error message from various error types
 */
export function getErrorMessage(error: unknown): string {
	if (error instanceof ApiRequestError) {
		return error.message;
	}

	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === 'string') {
		return error;
	}

	return 'An unexpected error occurred';
}

/**
 * Handle API errors and return formatted error data
 */
export function handleApiError(error: unknown): {
	message: string;
	errors?: Record<string, string[]>;
} {
	if (error instanceof ApiRequestError) {
		return {
			message: error.message,
			errors: error.errors
		};
	}

	return {
		message: getErrorMessage(error)
	};
}

/**
 * Get first validation error message from errors object
 */
export function getFirstValidationError(errors?: Record<string, string[]>): string | null {
	if (!errors) return null;

	const firstKey = Object.keys(errors)[0];
	if (!firstKey) return null;

	const firstError = errors[firstKey]?.[0];
	return firstError || null;
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors?: Record<string, string[]>): string {
	if (!errors) return '';

	return Object.entries(errors)
		.map(([field, messages]) => `${field}: ${messages.join(', ')}`)
		.join('\n');
}
