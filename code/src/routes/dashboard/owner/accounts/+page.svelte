<script>
    import { goto } from "$app/navigation";

    const users = [
        { id: 1, name: "Jose" },
        { id: 2, name: "Vanessa" },
        { id: 3, name: "Lucille" }
    ];

    function goToDetails(id) {
        goto(`/dashboard/owner/accounts/${id}`);
    };

    function goToEdit(id) {
        goto(`/dashboard/owner/accounts/${id}/edit`);
    }

    function deleteAccount(id) {
        console.log(`account ${id} deleted`);
    }
</script>

<div>
    <p>List of accounts</p>
    <button on:click={() => goto('/dashboard/owner/accounts/add')}>Add</button>

    <ul>
        {#each users as user}
        <li>
            <strong>{user.name}</strong>
            <button on:click={() => goToDetails(user.id)}>View</button>
            <button on:click={() => goToEdit(user.id)}>Edit</button>
            <button on:click={() => deleteAccount(user.id)}>Delete</button>
        </li>
        {/each}
    </ul>
</div>