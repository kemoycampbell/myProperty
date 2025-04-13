import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import AddProperty from './+page.svelte';

describe('Add Property UI', () => {
	test('should render Add New Property heading and form fields', () => {
		render(AddProperty);

		expect(screen.getByText('Add New Property')).toBeInTheDocument();

		expect(screen.getByLabelText('Name:')).toBeInTheDocument();
		expect(screen.getByLabelText('Address Line 1:')).toBeInTheDocument();
		expect(screen.getByLabelText('City:')).toBeInTheDocument();
		expect(screen.getByLabelText('State:')).toBeInTheDocument();
		expect(screen.getByLabelText('Zip Code:')).toBeInTheDocument();
        
		expect(screen.getByRole('button', { name: 'Create Property' })).toBeInTheDocument();
	});
});
