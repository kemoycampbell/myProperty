<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

    let userRequestId = '';
    let unitId = '';
    let description = '';

    let selectedProperty = '';
    let properties: { id: string; name: string }[] = [];
    let units: { id: string; number: string }[] = [];

    async function handleCreateMaintenanceRequest() {
        const res = await fetch('http://localhost:5173/api/maintenance_request/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userRequestId,
                unitId,
                description
            })
        });

        if (res.ok) {
            if(res.status === 200) {
                console.log('Maintenance request created successfully');
                alert('Maintenance request created successfully!');
                goto('/dashboard/owner/maintenance');
            }
            
            if(res.status === 400) 
            {
                console.error('Bad request: Please check your input.');
                alert('Bad request: Please check your input.');
            }
        } else {
            console.error('Failed to create maintenance request');
        }
    }

    // Fetch properties belonging to the owner
    async function fetchProperties(owner_id) {
        const res = await fetch(`http://localhost:5173/api/property/owner/${owner_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const response = await res.json();
            properties = response.properties.map((property) => ({
                id: property.id,
                name: property.name
            }));

            console.log('Properties:', properties);

            return properties;
        } else {
            console.error('Failed to fetch properties');
        }
    }

    // Handle on Property Change Unit Association Updates
    async function handlePropertyChange(event) {
        selectedProperty = event.target.value;
        if (selectedProperty) {
            try {
                const res = await fetch(`/api/unit/property/${selectedProperty}`);
                
                if (!res.ok) {
                throw new Error(`Failed to fetch units: ${res.status}`);
                }

                const data = await res.json();
                units = data.units;
            } catch (error) {
                console.error("Error loading units:", error);
                units = [];
            }
        } else {
            units = [];
        }
    }

    function cancel() {
        // Logic to cancel the request
        alert('Maintenance Request cancelled');
        goto('/dashboard/owner/maintenance');
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

        userRequestId = userInfo?.id;

        if (!userRequestId) {
            console.error("Owner ID not found in token");
            return;
        }

        fetchProperties(userInfo.id).then(fetchedProperties => {
            properties = fetchedProperties || [];
        });
    });
</script>

<div>
    <h2>Create Maintenance Request</h2>
    <form id="create-maintenance-request" on:submit|preventDefault={handleCreateMaintenanceRequest}>
        <label>
            <select bind:value={selectedProperty} on:change={handlePropertyChange} required>
                <option value="" disabled selected>Select Property</option>
                {#each properties as property}
                    <option value={property.id}>{property.name}</option>
                {/each}
            </select>
        </label>

        {#if selectedProperty}
        <label>
            <select bind:value={unitId}>
            <option value="" disabled selected>Select Unit</option>
            {#each units as unit}
                <option value={unit.id}>{unit.number}</option>
            {/each}
            </select>
        </label>
        {/if}

        <label>
            <textarea bind:value={description} placeholder="Description" required></textarea>
        </label>

        <button type="submit">Create Request</button>
        <button type="reset">Reset</button>
        <button type="button" on:click={cancel}>Cancel</button>
    </form>
</div>