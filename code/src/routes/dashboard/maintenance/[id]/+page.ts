// routes/maintenance_request/[id]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`/api/maintenance_request/${params.id}`);
	const json = await res.json();

	return {
		maintenanceRequest: json.maintenanceRequest
	};
};
