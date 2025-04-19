<script>
    import { onMount } from 'svelte';
    import { goto } from "$app/navigation";

    export let data;

    let property = null;

    onMount(async () => {
        const res = await fetch(`/api/property/${data.id}`);

        if (res.ok) {
            const responseData = await res.json();
            property = responseData.property;
        } else {
            goto('/dashboard/owner/properties');
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
        <!-- <p><strong>Address Line 2:</strong> {property.address_line2 ? property.address_line2 : 'N/A'}</p> -->
        <p><strong>City:</strong> {property.city}</p>
        <p><strong>State:</strong> {property.state}</p>
        <p><strong>Zip Code:</strong> {property.zip}</p>

        <button on:click={() => goToAdd()}>Add</button>

        <ul>
            <li>
                Unit number
            </li>
            <li>
                Unit number
            </li>
            <li>
                Unit number
            </li>
            <li>
                Unit number
            </li>
        </ul>

        <a href="/dashboard/owner/properties">Back to Property List</a>
    {:else}
        <p>Loading...</p>
    {/if}
</div>
