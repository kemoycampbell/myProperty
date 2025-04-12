import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import EditProperty from './+page.svelte';

describe('Edit Property UI', () => {
	test('should render edit property form and input fields', () => {
		render(EditProperty);

		expect(screen.getByText('Edit Property')).toBeInTheDocument();

		expect(screen.getByLabelText('Name:')).toBeInTheDocument();
		expect(screen.getByLabelText('Address Line 1:')).toBeInTheDocument();
		expect(screen.getByLabelText('City:')).toBeInTheDocument();
		expect(screen.getByLabelText('State:')).toBeInTheDocument();
		expect(screen.getByLabelText('ZIP:')).toBeInTheDocument();
        
		expect(screen.getByRole('button', { name: 'Update Property' })).toBeInTheDocument();
	});
});
