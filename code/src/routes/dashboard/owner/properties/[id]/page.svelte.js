import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import PropertyDetails from './+page.svelte';

describe('Property Details UI', () => {
	test('should render property details structure', () => {
		render(PropertyDetails);

		expect(screen.getByText('Name:')).toBeInTheDocument();
		expect(screen.getByText('Address Line 1:')).toBeInTheDocument();
		expect(screen.getByText('City:')).toBeInTheDocument();
		expect(screen.getByText('State:')).toBeInTheDocument();
		expect(screen.getByText('Zip Code:')).toBeInTheDocument();
        
		expect(screen.getByRole('link', { name: 'Back to Property List' })).toBeInTheDocument();
	});
});
