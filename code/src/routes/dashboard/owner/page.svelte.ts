import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import OwnerLayout from './+layout.svelte';

describe('Owner Layout UI', () => {
	test('should render welcome heading and navigation links', () => {
		render(OwnerLayout);

		expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Welcome Owner');
		expect(screen.getByRole('link', { name: 'Properties' })).toHaveAttribute('href', '/dashboard/owner/properties');
		expect(screen.getByRole('link', { name: 'Accounts' })).toHaveAttribute('href', '/dashboard/owner/accounts');
	});
});
