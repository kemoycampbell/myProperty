<script>
    import { goto } from "$app/navigation";

    let property = {
        name: '',
        address_line1: '',
        city: '',
        state: '',
        zip: ''
    };

    function decodeJWT(token) {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }

    const token = localStorage.getItem('token');
    const userInfo = token ? decodeJWT(token) : null;
    const ownerId = userInfo ? userInfo.id : '';

    async function handleSubmit() {
        const propertyData = {
            name: property.name,
            address_line1: property.address_line1,
            city: property.city,
            state: property.state.slice(0, 2),
            zip: property.zip.slice(0, 10),
            owner: ownerId
        };

        const res = await fetch('http://localhost:5173/api/property', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(propertyData)
        });

        if (res.ok) {
            goto('/dashboard/owner/properties');
        } else {
            console.error('Failed to create property');
        }
    }
</script>

<span>Add New Property</span>

<form on:submit|preventDefault={handleSubmit}>
    <label>
        Name:
        <input bind:value={property.name} required />
    </label>
    <br />

    <label>
        Address Line 1:
        <input bind:value={property.address_line1} required />
    </label>
    <br />

    <label>
        City:
        <input bind:value={property.city} required />
    </label>
    <br />

    <label>
        State:
        <input bind:value={property.state} required maxlength="2" />
    </label>
    <br />

    <label>
        Zip Code:
        <input bind:value={property.zip} required maxlength="10" />
    </label>
    <br />

    <button type="submit">Create Property</button>
</form>
