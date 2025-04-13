import { describe, test, expect, vi, beforeAll } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Layout from './+layout.svelte';
import { goto } from '$app/navigation';

vi.mock('$app/navigation', () => ({
  goto: vi.fn(),
}));

describe('Dashboard Layout UI (+layout.svelte)', () => {
	// Typescript throw an error if you don't put all the operations.
	beforeAll(() => {
		global.localStorage = {
			removeItem: vi.fn(),
			setItem: vi.fn(),
			getItem: vi.fn(),
			clear: vi.fn(),
			key: vi.fn(),
			length: 0,
		};
	});

	const mockGoto = goto;

	test('should render header with title and logout button', () => {
		render(Layout);

		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dashboard');
		expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
	});

	test('should call removeItem and goto on logout', async () => {
		render(Layout);

		const logoutButton = screen.getByRole('button', { name: 'Logout' });
		await fireEvent.click(logoutButton);
		
		expect(localStorage.removeItem).toHaveBeenCalledWith('token');
		expect(mockGoto).toHaveBeenCalledWith('/');
	});
});
