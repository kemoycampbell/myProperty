<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let users = [];

    async function fetchUsers() {
        const response = await fetch("http://localhost:5173/api/user");
        const data = await response.json();
        users = data.users;
    }

    onMount(() => {
        fetchUsers();
    });

    function goToDetails(id) {
        goto(`/dashboard/owner/accounts/${id}`);
    }

    // function goToEdit(id) {
    //     goto(`/dashboard/owner/accounts/${id}/edit`);
    // }

    function deleteAccount(id) {
        console.log(`account ${id} deleted`);
    }
</script>

<div>
    <p>List of accounts</p>
    <button on:click={() => goto('/dashboard/owner/accounts/add')}>Add</button>

    <ul>
        {#if users.length > 0}
            {#each users as user}
                <li>
                    <strong>{user.firstName} {user.lastName}</strong>
                    <button on:click={() => goToDetails(user.id)}>View</button>
                    <!-- No edit for this iteration future work! -->
                    <!-- <button on:click={() => goToEdit(user.id)}>Edit</button> -->
                    <button on:click={() => deleteAccount(user.id)}>Delete</button>
                </li>
            {/each}
        {:else}
            <p>No users found.</p>
        {/if}
    </ul>
</div>