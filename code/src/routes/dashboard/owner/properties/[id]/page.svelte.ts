// import { describe, test, expect } from 'vitest';
// import '@testing-library/jest-dom/vitest';
// import { render, screen } from '@testing-library/svelte';
// import PropertyDetails from './+page.svelte';

// describe('Property Details - HTML Verification', () => {
//   test('should show only loading state initially', () => {
//     // 1. Render con la estructura mínima requerida
//     const { container } = render(PropertyDetails, {
//       props: {
//         data: { id: 'test-id' } // Satisface el parámetro de ruta
//       }
//     });

//     // 2. Verificación directa del HTML renderizado
//     expect(container.innerHTML).toContain('Loading...');
//     expect(container.innerHTML).not.toContain('Name:');
//     expect(container.innerHTML).not.toContain('Address Line 1:');
//   });
// });