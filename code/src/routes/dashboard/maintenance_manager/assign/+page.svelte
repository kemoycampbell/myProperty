<script lang="ts">
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

	let maintenance_request_id = '';
	let user_operator_id = '';
	let status = '';

    let user_operators: { 
        id: string, 
        firstName: string,
        lastName: string }[] = [];
        
    let maintenance_requests: { 
        id: string, 
        userRequestedID: string, 
        unitID: string, 
        description: string }[] = [];

	const statuses = ['new', 'in_progress', 'completed', 'unassigned'];

    // get all of the maintenance requests
    async function getMaintenanceRequests() {
        const res = await fetch('http://localhost:5173/api/maintenance_request/all');
        if (res.ok) {
            const maintenance_requests = await res.json()
            return maintenance_requests.maintenanceRequests;
        } else {
            console.error('Failed to fetch maintenance requests');
            return [];
        }
    }

    async function handleMaintenanceRequestAssignment() {
        const res = await fetch('http://localhost:5173/api/operator/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                maintenance_request_id,
                user_operator_id,
                status
            })
        });

        if (res.ok) {
            alert('Maintenance request assigned successfully!');
            goto('/dashboard/maintenance_manager/all');
        } else {
            console.error('Failed to assign maintenance request');
        }
    }

    // let's get all of the users by role maintenance operator and create a dropdown list in div
    async function getUsersByRole() {
        const res = await fetch(`http://localhost:5173/api/user/operator/all`);
        if (res.ok) {
            const users = await res.json();
            return users.users;
        } else {
            console.error('Failed to fetch users');
            return [];
        }
    }


    onMount(async () => {
        maintenance_requests = await getMaintenanceRequests();
        user_operators = await getUsersByRole();
    });
</script>

<div>
    <h1 style="text-align: center;">Assign Maintenance Request</h1>

    <form id="add-form" on:submit|preventDefault={handleMaintenanceRequestAssignment}>
        <label>
            <select bind:value={maintenance_request_id} required>
                <option value="" disabled selected>Select Maintenance Request</option>
                {#each maintenance_requests as maintenance_request}
                    <option value={maintenance_request.id}>
                        {maintenance_request.unitID} -
                        {maintenance_request.description}
                    </option>
                {/each}
        </label>
        <br />

        <label>
            <select bind:value={user_operator_id} required>
                <option value="" disabled selected>Select User Operator</option>
                {#each user_operators as user_operator}
                    <option value={user_operator.id}>{user_operator.firstName} {user_operator.lastName}</option>
                {/each}
        </label>
        <br />

        <label>
            <select bind:value={status} required>
                <option value="" disabled selected>Select Status</option>
                {#each statuses as status}
                    <option value={status}>{status}</option>
                {/each}
            </select>
        </label>
        <br />

        <button type="submit">Assign</button>
    </form>
</div>