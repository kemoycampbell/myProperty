<script>
    import { onMount } from 'svelte';

    let properties = [];
    let units = [];
    let users = [];

    let selectedPropertyId = '';
    let selectedUnitId = '';
    let selectedUserId = '';
    let startDate = '';
    let endDate = '';

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

    // Cargar propiedades y usuarios al montar
    onMount(async () => {
        try {
            const [propertiesRes, usersRes] = await Promise.all([
                fetch(`/api/property/owner/${userInfo.id}`),
                fetch(`http://localhost:5173/api/user`)
            ]);

            if (!propertiesRes.ok) throw new Error(`Failed to fetch properties: ${propertiesRes.status}`);
            if (!usersRes.ok) throw new Error(`Failed to fetch users: ${usersRes.status}`);

            const propertiesData = await propertiesRes.json();
            const usersData = await usersRes.json();

            properties = propertiesData.properties;
            users = usersData.users;
        } catch (error) {
            console.error("Error loading data:", error);
        }
    });

    // Cargar unidades al seleccionar propiedad
    async function fetchUnits() {
        if (!selectedPropertyId) return;

        try {
            const res = await fetch(`/api/unit/property/${selectedPropertyId}`);

            if (!res.ok) {
                throw new Error(`Failed to fetch units: ${res.status}`);
            }

            const data = await res.json();
            units = data.units;
        } catch (error) {
            console.error("Error loading units:", error);
        }
    }

    $: selectedPropertyId, fetchUnits();

    // Función para hacer el POST y asignar el inquilino
    async function assignTenant() {
        if (!selectedUserId || !selectedUnitId || !startDate || !endDate) {
            alert("Please fill in all fields.");
            return;
        }

        const payload = {
            tenant: selectedUserId,
            unit: selectedUnitId,
            startDate,
            endDate
        };

        try {
            const res = await fetch(`/api/unit/property/${userInfo.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error(`Failed to assign tenant: ${res.status}`);
            }

            const result = await res.json();
            alert(result.message || 'Tenant assigned successfully!');
        } catch (error) {
            console.error("Error assigning tenant:", error);
            alert("Error assigning tenant.");
        }
    }
</script>

<div>
    <p>Select a property</p>
    <select bind:value={selectedPropertyId}>
        <option value="">Select a property</option>
        {#each properties as property}
            <option value={property.id}>{property.name}</option>
        {/each}
    </select>

    {#if selectedPropertyId}
        <p>Select a unit</p>
        <select bind:value={selectedUnitId}>
            <option value="">Select a unit</option>
            {#each units as unit}
                <option value={unit.id}>{unit.number}</option>
            {/each}
        </select>
    {/if}

    <p>Select a user</p>
    <select bind:value={selectedUserId}>
        <option value="">Select a user</option>
        {#each users as user}
            <option value={user.id}>{user.firstName} {user.lastName}</option>
        {/each}
    </select>

    <p>Start date</p>
    <input type="date" bind:value={startDate} />

    <p>End date</p>
    <input type="date" bind:value={endDate} />

    <br /><br />
    <button on:click={assignTenant}>Assign Tenant</button>
</div>
