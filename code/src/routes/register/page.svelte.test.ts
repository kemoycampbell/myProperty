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

describe('Register Page (+page.svelte)', () => {
	test('should render the register form', () => {
		render(Page);
	
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Register');
		expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
		expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
		expect(screen.getByLabelText('Email:')).toBeInTheDocument();
		expect(screen.getByLabelText('Username:')).toBeInTheDocument();
		expect(screen.getByLabelText('Password:')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
	});

	test('should submit register form and store token', async () => {
		const { getByLabelText, getByRole } = render(Page);

		await fireEvent.input(getByLabelText('First Name:'), { target: { value: 'Jose' } });
		await fireEvent.input(getByLabelText('Last Name:'), { target: { value: 'Palomino' } });
		await fireEvent.input(getByLabelText('Email:'), { target: { value: 'jose@example.com' } });
		await fireEvent.input(getByLabelText('Username:'), { target: { value: 'jose' } });
		await fireEvent.input(getByLabelText('Password:'), { target: { value: '1234' } });

		const roleInput = screen.queryByLabelText('Role:');
		if (roleInput) {
			await fireEvent.input(roleInput, { target: { value: 'owner' } });
		}

		await fireEvent.click(getByRole('button', { name: /register/i }));

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				'http://localhost:5173/api/auth/register',
				expect.objectContaining({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						firstName: 'Jose',
						lastName: 'Palomino',
						email: 'jose@example.com',
						username: 'jose',
						password: '1234',
						role: 'owner'
					})
				})
			);

			expect(localStorage.getItem('token')).toBe(mockToken);
		});

		const { goto } = await import('$app/navigation');
		expect(goto).toHaveBeenCalledWith('/dashboard/owner/properties');
	});

	test('should log error if register fails', async () => {
		global.fetch = vi.fn(() =>
			Promise.resolve(new Response('Error', { status: 400 }))
		);

		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		const { getByLabelText, getByRole } = render(Page);

		await fireEvent.input(getByLabelText('First Name:'), { target: { value: 'Jose' } });
		await fireEvent.input(getByLabelText('Last Name:'), { target: { value: 'Palomino' } });
		await fireEvent.input(getByLabelText('Email:'), { target: { value: 'jose@example.com' } });
		await fireEvent.input(getByLabelText('Username:'), { target: { value: 'jose' } });
		await fireEvent.input(getByLabelText('Password:'), { target: { value: '1234' } });

		await fireEvent.click(getByRole('button', { name: /register/i }));

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith('Failed to register');
		});

		consoleSpy.mockRestore();
	});
});
