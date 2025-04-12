<script>
    import { goto } from "$app/navigation";

    const properties = [
        { id: 1, name: "Furnished House" },
        { id: 2, name: "Modern Office" },
        { id: 3, name: "Beach Apartment" }
    ];

    function goToDetails(id) {
        goto(`/dashboard/owner/${id}`);
    };

    function goToEdit(id) {
        goto(`/dashboard/owner/${id}/edit`);
    }

    function deleteProperty(id) {
        console.log(`property ${id} deleted`);
    }
</script>

<div>
    <h2>Welcome, Owner</h2>
    <p>Properties:</p>

    <button on:click={() => goto('/dashboard/owner/add')}>Add</button>

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
</div>