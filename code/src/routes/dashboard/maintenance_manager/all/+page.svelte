<script lang="ts">
    import { onMount } from "svelte";
    
    let maintenanceRequests: any[] = [];

    onMount(async () => {
        const res = await fetch('/api/maintenance_request/all');
        if (res.ok) {
            const json = await res.json();
            maintenanceRequests = json.maintenanceRequests;
            console.log(maintenanceRequests);
        } else {
            console.error("Failed to fetch maintenance requests");
        }
    });
</script>

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
