import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import AddAccount from './+page.svelte';

describe('AddAccount HTML UI', () => {
	test('displays the title and the form with inputs', () => {
		render(AddAccount);

		expect(screen.getByText('Add account')).toBeInTheDocument();
		expect(screen.getByLabelText('Name:')).toBeInTheDocument();
		expect(screen.getByLabelText('Username:')).toBeInTheDocument();
		expect(screen.getByLabelText('Password:')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
	});
});
