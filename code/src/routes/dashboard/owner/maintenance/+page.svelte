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
