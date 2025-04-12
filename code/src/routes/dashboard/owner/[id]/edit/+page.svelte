<script>
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

    const properties = {
        1: {
            name: "Furnished House",
            address: "Main Street #123, City",
            type: "House",
            status: "Rented"
        },
        2: {
            name: "Modern Office",
            address: "Central Avenue #456, City",
            type: "Office",
            status: "Available"
        },
        3: {
            name: "Beach Apartment",
            address: "Ocean Drive #789, City",
            type: "Apartment",
            status: "Rented"
        }
    };

    export let data;

	let name = '';
	let address = '';
    let type = '';
	let status = '';

    onMount(() => {
        let property = properties[data.id];
        if (property) {
            name = property.name;
            address = property.address;
            type = property.type;
            status = property.status;
        }
    });

	function handleSubmit() {
        goto('/dashboard/owner');
	}
    
</script>

<h1>Edit Property</h1>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		Name:
		<input bind:value={name} required />
	</label>
	<br />

	<label>
		Address:
		<input bind:value={address} required />
	</label>
	<br />

	<label>
		Type:
		<input bind:value={type} required />
	</label>
	<br />

    <label>
		Status:
		<input bind:value={status} required />
	</label>
	<br />

	<button type="submit">Update Property</button>
</form>
