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

    async function deleteProperty(id) {
        try {
            const res = await fetch(`/api/property/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error(`Failed to delete property: ${res.status}`);
            }
            
            properties = properties.filter(property => property.id !== id);
            console.log(`Property with id ${id} deleted successfully`);
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    }
</script>



<div id="body">
<div id="class-box">
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
		flex-direction: column;
		justify-content: center;
	}

    #class-box button{
        border-radius: 15px;
		background: #73ad21;
		padding: 10px;
		width: 25%;
		height: 20%;
        margin-bottom: 5%;
        align-self: center;
		
    }

    ::-webkit-input-placeholder {
            text-align: center;
    }

</style>
