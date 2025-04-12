<script>
    import { goto } from "$app/navigation";

    const properties = [
        { id: 1, name: "Furnished House" },
        { id: 2, name: "Modern Office" },
        { id: 3, name: "Beach Apartment" }
    ];

    function decodeJWT(token) {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }

    const token = localStorage.getItem('token');
    const userInfo = decodeJWT(token);
    console.log('User info:', userInfo);

    function goToDetails(id) {
        goto(`/dashboard/owner/properties/${id}`);
    };

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
