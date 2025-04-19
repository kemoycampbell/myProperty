<script>
    import { goto } from "$app/navigation";

    let firstName = '';
    let lastName = '';
    let email = '';
    let username = '';
    let password = '';
    let role = '';

    const roles = ['owner', 'tenant', 'maintenance manager', 'maintenance operator'];

    async function handleRegister() {
        const res = await fetch('http://localhost:5173/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                username,
                password,
                role
            })
        });

        if (res.ok) {
            goto('/dashboard/owner/accounts');
        } else {
            console.error('Failed to register');
        }
    }
</script>

<div>
    <h1>Create account</h1>

    <form on:submit|preventDefault={handleRegister}>
        <label>
            First Name:
            <input type="text" bind:value={firstName} required />
        </label>
        <br />

        <label>
            Last Name:
            <input type="text" bind:value={lastName} required />
        </label>
        <br />

        <label>
            Email:
            <input type="email" bind:value={email} required />
        </label>
        <br />

        <label>
            Username:
            <input type="text" bind:value={username} required />
        </label>
        <br />

        <label>
            Password:
            <input type="password" bind:value={password} required />
        </label>
        <br />

        <label>
            Role:
            <select bind:value={role} required>
                <option value="" disabled selected>Select a role</option>
                {#each roles as roleOption}
                    <option value={roleOption}>{roleOption}</option>
                {/each}
            </select>
        </label>
        <br />

        <button type="submit">Save</button>
    </form>
</div>