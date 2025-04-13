import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import PropertyList from './+page.svelte';

describe('Property List UI', () => {
	test('should render heading and Add button', () => {
		render(PropertyList);

		expect(screen.getByText('List of properties')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
	});
});
