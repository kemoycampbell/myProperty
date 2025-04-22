<script>
    import { onMount } from 'svelte';
    import { goto } from "$app/navigation";

    export let data;

    let property = null;
    let units = [];

    onMount(async () => {
        const res = await fetch(`/api/property/${data.id}`);
        const unitRes = await fetch(`/api/unit/property/${data.id}`);

        if (res.ok) {
            const responseData = await res.json();
            property = responseData.property;
        } else {
            goto('/dashboard/owner/properties');
        }

        if (unitRes.ok) {
            const unitData = await unitRes.json();
            units = unitData.units;
        }
    });

    function goToAdd() {
        goto(`/dashboard/owner/properties/${data.id}/unit`);
    }
</script>
<div id="body">
    <div id="class-box">

  
<div>
    {#if property}
        <p><strong>Name:</strong> {property.name}</p>
        <p><strong>Address Line 1:</strong> {property.address_line1}</p>
        <p><strong>City:</strong> {property.city}</p>
        <p><strong>State:</strong> {property.state}</p>
        <p><strong>Zip Code:</strong> {property.zip}</p>

        <button on:click={goToAdd}>Add</button>

        <ul>
            {#each units as unit}
                <li>Unit #{unit.number}</li>
            {/each}
        </ul>

        <a href="/dashboard/owner/properties">Back to Property List</a>
    {:else}
        <p>Loading...</p>
    {/if}
</div>
</div>
</div>

<style>
	#body {
		justify-items: center;
		padding-top: 10%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0px;
		z-index: 10;
		overflow: hidden;
		position: relative;
	}

	#class-box {
		width: 60vw;
		height: 40vh;
		max-width: 800px;
		max-height: 600px;
		background-color: rgb(50, 50, 50);
		border: 0.5rem solid #5f0f40;
		border-top-right-radius: 5rem;
		border-bottom-left-radius: 5rem;

		padding: 2rem;
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	#class-box button {
		border-radius: 15px;
		background: #73ad21;
		padding: 10px;
		width: 25%;
		height: 20%;
		margin-bottom: 5%;
		align-self: center;
	}
</style>