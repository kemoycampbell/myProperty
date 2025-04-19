<script>
	import { onMount } from 'svelte';

	let properties = [];
	let tenants = [];
	let units = [];

	let selectedProperty = null;
	let selectedUnit = null;
	let selectedTenant = null;

	let token = localStorage.getItem('token');
	let userInfo = token ? JSON.parse(atob(token.split('.')[1])) : null;

	onMount(async () => {
		try {
			const [tenantRes, propertyRes] = await Promise.all([
				fetch(`/api/user`),
				fetch(`/api/property/owner/${userInfo.id}`)
			]);

			tenants = (await tenantRes.json()).tenants;
			properties = (await propertyRes.json()).properties;
		} catch (err) {
			console.error("Error loading data:", err);
		}
	});

	// Load units when a property is selected
	$: if (selectedProperty) {
		loadUnits(selectedProperty);
	}

	async function loadUnits(propertyId) {
		try {
			const res = await fetch(`/api/unit/property/${propertyId}`);
			if (!res.ok) throw new Error("Failed to load units");
			units = (await res.json()).units;
		} catch (err) {
			console.error("Error loading units:", err);
			units = [];
		}
	}

	async function assignTenant() {
		if (!selectedTenant || !selectedUnit) {
			alert("Please select both a tenant and a unit");
			return;
		}

		try {
			const res = await fetch(`/api/unit/${selectedUnit}/assign-tenant`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ tenantId: selectedTenant }),
			});

			if (!res.ok) throw new Error("Assignment failed");

			alert("Tenant assigned successfully!");
		} catch (err) {
			console.error("Assignment error:", err);
			alert("Failed to assign tenant.");
		}
	}
</script>

<h2>Assign Tenant to a Unit</h2>

<!-- Property Select -->
<div>
	<label>Property:</label>
	<select bind:value={selectedProperty}>
		<option value="" disabled selected>Select a property</option>
		{#each properties as property}
			<option value={property.id}>{property.name}</option>
		{/each}
	</select>
</div>

<!-- Unit Select (Filtered) -->
{#if units.length > 0}
	<div>
		<label>Unit:</label>
		<select bind:value={selectedUnit}>
			<option value="" disabled selected>Select a unit</option>
			{#each units as unit}
				<option value={unit.id}>{unit.name}</option>
			{/each}
		</select>
	</div>
{:else if selectedProperty}
	<p>Loading units...</p>
{/if}

<!-- Tenant Select -->
<div>
	<label>Tenant:</label>
	<select bind:value={selectedTenant}>
		<option value="" disabled selected>Select a tenant</option>
		{#each tenants as tenant}
			<option value={tenant.id}>{tenant.name}</option>
		{/each}
	</select>
</div>

<button on:click={assignTenant}>Assign Tenant</button>
