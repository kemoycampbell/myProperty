<script>
    const properties = [
        { id: 1, name: "Furnished House" },
        { id: 2, name: "Modern Office" },
        { id: 3, name: "Beach Apartment" }
    ];
</script>

<div>
    <h2>Welcome, Owner</h2>
    <p>Properties:</p>

    <button>Add Property</button>

    <ul>
        {#each properties as property}
        <li>
            <strong>{property.name}</strong>
            <a href="/dashboard/owner/{property.id}">View details</a>
            <button on:click={() => console.log(`property ${property.id}`)}>Delete Property</button>
        </li>
        {/each}
    </ul>
</div>