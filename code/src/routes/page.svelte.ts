import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('Login Page (+page.svelte)', () => {
	test('should render the login form', () => {
		render(Page);

		expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
		expect(screen.getByLabelText('Username:')).toBeInTheDocument();
		expect(screen.getByLabelText('Password:')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Register' })).toHaveAttribute('href', '/register');
	});
});
