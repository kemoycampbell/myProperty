<script lang="ts">
	export let data;
	let maintenanceRequest = data.maintenanceRequest;

    if(!maintenanceRequest)
        console.log("Could not find maintenance request");
    
</script>

{#if maintenanceRequest}
	<div>
		<div>ID: {maintenanceRequest.id}</div>
		<div>User Requested ID: {maintenanceRequest.user_requested_id}</div>
		<div>Unit ID: {maintenanceRequest.unit_id}</div>
		<div>Description: {maintenanceRequest.description}</div>
		<div>Created At: {maintenanceRequest.created_at}</div>
	</div>
{:else}
	<div>
		<h1>Maintenance Request Not Found</h1>
		<p>The requested maintenance request could not be found.</p>
	</div>
{/if}
