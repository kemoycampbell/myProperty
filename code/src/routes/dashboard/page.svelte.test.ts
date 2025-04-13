import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Layout from './+layout.svelte';

describe('Dashboard Layout UI (+layout.svelte)', () => {
	test('should render header with title and logout button', () => {
		render(Layout);

		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dashboard');
		expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
	});
});
