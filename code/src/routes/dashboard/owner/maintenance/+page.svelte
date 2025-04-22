<script lang="ts">
	import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let maintenanceRequests: any[] = [];
    let ownerId: string = "";

    async function fetchMaintenanceRequests(owner_id: string) {
        const res = await fetch(`/api/maintenance_request/by/${owner_id}`);
        if (!res.ok) {
            throw new Error("Failed to fetch maintenance requests");
        }

        return await res.json();
    }

    function decodeJWT(token: string) {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }

    onMount(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token not found");
            return;
        }

        let userInfo;

        try {
            userInfo = decodeJWT(token);
        } catch (err) {
            console.error("Invalid token", err);
            return;
        }

        ownerId = userInfo?.id;

        if (!ownerId) {
            console.error("Owner ID not found in token");
            return;
        }

        fetchMaintenanceRequests(ownerId)
            .then((json) => {
                console.log("Fetched response:", json);

                // if your API returns { maintenanceRequests: [...] }
                maintenanceRequests = [...json.maintenanceRequest];

                console.log("Assigned requests:", maintenanceRequests);
            })
            .catch((error) => {
                console.error(error);
            });
    });
</script>


<div id="body">
	<div id="class-box">
		<div id="add-form">
<div>
    <h2>Owner's Maintenance Requests</h2>

    <button on:click={() => { goto("/dashboard/owner/maintenance/create") }}>
        Create
    </button>

    {#if maintenanceRequests.length == 0}
        <p>No maintenance requests found.</p>
    {:else}
        <p>Found {maintenanceRequests.length} maintenance requests.</p>

        {#each maintenanceRequests as request}
            <div>
                <div>ID: {request.id}</div>
                <div>User Requested ID: {request.user_requested_id}</div>
                <div>Unit ID: {request.unit_id}</div>
                <div>Description: {request.description}</div>
                <div>Created At: {request.created_at}</div>
                <hr />
            </div>
        {/each}
    {/if}
</div>
        </div>
    </div>
</div>
<style>
	#add-form {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
	}

	::-webkit-input-placeholder {
		text-align: center;
	}

	#body {
		justify-items: center;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0px;
		z-index: 10;
		overflow: hidden;
		position: relative;
		padding-top: 2%;
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
	#prop-button {
		border-radius: 15px;
		background: #73ad21;
		padding: 10px;
		width: 20%;
		height: 25%;
		margin-right: 2%;
	}
</style>