<script>
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	export let data;

	let name = '';
	let address_line1 = '';
	let address_line2 = '';
	let city = '';
	let state = '';
	let zip = '';

	onMount(async () => {
        const res = await fetch(`/api/property/${data.id}`);
        if (res.ok) {
            const responseData = await res.json();
            const property = responseData.property;

            name = property.name;
            address_line1 = property.address_line1;
            address_line2 = property.address_line2 ?? '';
            city = property.city;
            state = property.state;
            zip = property.zip;
        }
    });


	async function handleSubmit() {
		const res = await fetch(`/api/property/${data.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				address_line1,
				address_line2,
				city,
				state,
				zip
			})
		});

		if (res.ok) {
			goto('/dashboard/owner/properties');
		} else {
			console.error('Error updating property');
		}
	}
</script>

<span>Edit Property</span>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		Name:
		<input bind:value={name} required />
	</label><br />

	<label>
		Address Line 1:
		<input bind:value={address_line1} required />
	</label><br />

	<!-- <label>
		Address Line 2:
		<input bind:value={address_line2} />
	</label><br /> -->

	<label>
		City:
		<input bind:value={city} required />
	</label><br />

	<label>
		State:
		<input bind:value={state} required maxlength="2" />
	</label><br />

	<label>
		ZIP:
		<input bind:value={zip} required maxlength="5" />
	</label><br />

	<button type="submit">Update Property</button>
</form>
