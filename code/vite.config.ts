import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'; // Make sure this import is present

export default defineConfig({
    plugins: [
        sveltekit(),
        tsconfigPaths() // Keep it here for the root config (dev/build)
    ],

    test: {
        workspace: [
            {
                // CLIENT WORKSPACE (Seems okay, inherits tsconfigPaths from root via extends)
                extends: './vite.config.ts',
                plugins: [svelteTesting()], // Add specific client plugins here
                test: {
                    name: 'client',
                    environment: 'jsdom',
                    clearMocks: true,
                    include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
                    exclude: ['src/lib/server/**'],
                    setupFiles: ['./vitest-setup-client.ts']
                }
            },
            {
                // SERVER WORKSPACE
                extends: './vite.config.ts', // Still extend base config
                // *** Add the plugin explicitly for this workspace ***
                plugins: [tsconfigPaths()],
                test: {
                    name: 'server',
                    environment: 'node', // Correct environment for server tests
                    include: ['src/**/*.{test,spec}.{js,ts}', 'src/tests/**/*.{test,spec}.{js,ts}'],
                    exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
                    // You might need server-specific setupFiles here too eventually:
                    // setupFiles: ['./vitest-setup-server.ts']
                }
            }
        ],
        // Root test options (apply if not overridden in workspace)
        clearMocks: true,
        coverage: {
			
            include: ['src/**/*'],
            exclude: [
                // Exclusions seem fine
                'src/lib/server/repositories/**',
                'src/lib/server/models/**',
                'src/lib/server/database/**',
                'src/hooks.*{js,ts}',
                'src/tests/**',
                'src/lib/index.ts',
                'src/app.d.ts'
            ]
        }
    }
});