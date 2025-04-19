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
