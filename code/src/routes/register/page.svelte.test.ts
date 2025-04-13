import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

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
});
