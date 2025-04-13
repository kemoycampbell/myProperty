import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import Page from './+page.svelte';

vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

const mockToken = 'fake-token';

beforeEach(() => {
	global.fetch = vi.fn(() =>
		Promise.resolve(
			new Response(JSON.stringify({ token: mockToken }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		)
	);
	
	const localStorageMock = (() => {
		let store: Record<string, string> = {};
		return {
			getItem: (key: string) => store[key] || null,
			setItem: (key: string, value: string) => {
				store[key] = value;
			},
			clear: () => {
				store = {};
			}
		};
	})();
	Object.defineProperty(window, 'localStorage', {
		value: localStorageMock
	});
});

describe('Login Page (+page.svelte)', () => {
	test('should render the login form', () => {
		render(Page);

		expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
		expect(screen.getByLabelText('Username:')).toBeInTheDocument();
		expect(screen.getByLabelText('Password:')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Register' })).toHaveAttribute('href', '/register');
	});

	test('should submit the form and store token', async () => {
		const { getByLabelText, getByRole } = render(Page);

		await fireEvent.input(getByLabelText('Username:'), { target: { value: 'jose' } });
		await fireEvent.input(getByLabelText('Password:'), { target: { value: '1234' } });
		await fireEvent.click(getByRole('button', { name: 'Login' }));

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				'http://localhost:5173/api/auth/login',
				expect.objectContaining({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username: 'jose', password: '1234' })
				})
			);

			expect(localStorage.getItem('token')).toBe(mockToken);
		});

		const { goto } = await import('$app/navigation');
		expect(goto).toHaveBeenCalledWith('/dashboard/owner/properties');
	});
});
