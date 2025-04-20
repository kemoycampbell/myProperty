<script>
	import { goto } from '$app/navigation';

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
	<h1 style="text-align: center;">Create account</h1>

	<form id="add-form" on:submit|preventDefault={handleRegister}>
		<label>
			<input type="text" bind:value={firstName} placeholder="First Name" required />
		</label>
		<br />

		<label>
			<input type="text" bind:value={lastName} placeholder="Last Name" required />
		</label>
		<br />

		<label>
			<input type="email" bind:value={email} placeholder="E-Mail" required />
		</label>
		<br />

		<label>
			<input type="text" bind:value={username} placeholder="Username" required />
		</label>
		<br />

		<label>
			<input type="password" bind:value={password} placeholder="Password" required />
		</label>
		<br />

		<label>
		
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

<style>

    #add-form{
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
    }
    
    ::-webkit-input-placeholder {
            text-align: center;
    }


</style>