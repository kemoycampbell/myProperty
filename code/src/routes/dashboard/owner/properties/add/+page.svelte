<script>
	import { goto } from "$app/navigation";

	let name = '';
	let location = '';
	let price = '';

	function handleSubmit() {
        goto('/dashboard/owner/properties');
	}
</script>

<span>Add New Property</span>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		Name:
		<input bind:value={name} required />
	</label>
	<br />

	<label>
		Location:
		<input bind:value={location} required />
	</label>
	<br />

	<label>
		Price:
		<input type="number" bind:value={price} required />
	</label>
	<br />

	<button type="submit">Create Property</button>
</form>
