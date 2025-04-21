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
                goto('/dashboard/owner/properties');
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

    // call api to retrieve units based on owner's properties
    async function fetchProperties(owner_id) {
        const res = await fetch(`http://localhost:5173/api/property/owner/${owner_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const properties = await res.json();
            console.log('Properties:', properties.properties);
            return properties.properties;
        } else {
            console.error('Failed to fetch properties');
        }
    }

    // Handle property selection change
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

    onMount(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = token.split('.')[1];
            const userInfo = JSON.parse(atob(payload));
            userRequestId = userInfo.id;
            console.log('User info:', userInfo);
            // fetchProperties gets a list of properties based on the owner id - process them to each be pushed to the properties list
            fetchProperties(userInfo.id).then(fetchedProperties => {
                properties = fetchedProperties;
            });
        } else {
            console.error('No token found');
        }
    });
</script>

<div>
    <div id="body">
        <div id="class-box">
            <form id="create-maintenance-request" on:submit|preventDefault={handleCreateMaintenanceRequest}>
                <h1 id="create-maintenance-title">Create Maintenance Request</h1>
    
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
            </form>
        </div>
    </div>
</div>