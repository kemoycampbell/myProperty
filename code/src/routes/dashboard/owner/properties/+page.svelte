<script>
    import { onMount } from 'svelte';
    import { goto } from "$app/navigation";

    let properties = [];

    function decodeJWT(token) {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }

    const token = localStorage.getItem('token');
    let userInfo;

    if (token) {
        try {
            userInfo = decodeJWT(token);
        } catch (error) {
            console.error("Error decoding token", error);
        }
    }

    onMount(async () => {
        try {
            const res = await fetch(`/api/property/owner/${userInfo.id}`);

            if (!res.ok) {
                throw new Error(`Failed to fetch properties: ${res.status}`);
            }

            const data = await res.json();
            properties = data.properties;
        } catch (error) {
            console.error("Error loading properties:", error);
        }
    });

    function goToDetails(id) {
        goto(`/dashboard/owner/properties/${id}`);
    }

    function goToEdit(id) {
        goto(`/dashboard/owner/properties/${id}/edit`);
    }

    function deleteProperty(id) {
        console.log(`property ${id} deleted`);
    }
</script>

<div>
    <p>List of properties</p>
    <button on:click={() => goto('/dashboard/owner/properties/add')}>Add</button>

    {#if properties.length > 0}
        <ul>
            {#each properties as property}
            <li>
                <strong>{property.name}</strong>
                <button on:click={() => goToDetails(property.id)}>View</button>
                <button on:click={() => goToEdit(property.id)}>Edit</button>
                <button on:click={() => deleteProperty(property.id)}>Delete</button>
            </li>
            {/each}
        </ul>
    {:else}
        <p>No properties found.</p>
    {/if}
</div>
