<script>
    import { goto } from "$app/navigation";

    export let data;

    let unit = {
        number: '',
        property: data.id
    };

    async function handleSubmit() {
        const unitData = {
            number: unit.number,
            property: {
                id: unit.property
            }
        };

        const res = await fetch('http://localhost:5173/api/unit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(unitData)
        });

        if (res.ok) {
            goto(`/dashboard/owner/properties/${data.id}`);
        } else {
            console.error('Failed to create unit');
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <label>
        Number:
        <input bind:value={unit.number} required />
    </label>
    <br />

    <button type="submit">Create Unit</button>
</form>
