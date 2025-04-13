import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import AccountsList from './+page.svelte';

describe('AccountsList HTML UI', () => {
	test('displays the title and Add button', () => {
		render(AccountsList);

		expect(screen.getByText('List of accounts')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
	});

	test('displays the list of users with their action buttons', () => {
		render(AccountsList);

		expect(screen.getByText('Jose')).toBeInTheDocument();
		expect(screen.getByText('Vanessa')).toBeInTheDocument();
		expect(screen.getByText('Lucille')).toBeInTheDocument();

		expect(screen.getAllByRole('button', { name: 'View' })).toHaveLength(3);
		expect(screen.getAllByRole('button', { name: 'Edit' })).toHaveLength(3);
		expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(3);
	});
});
