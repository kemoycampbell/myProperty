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

<div id="body">
	<div id="class-box">
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

		<button id="prop-button" type="submit">Save</button>
	</form></div>
</div>

<style>
	#add-form {
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

	#body {
		justify-items: center;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0px;
		z-index: 10;
		overflow: hidden;
		position: relative;
		padding-top: 2%;
	}

	#class-box {
		width: 60vw;
		height: 40vh;
		max-width: 800px;
		max-height: 600px;
		background-color: rgb(50, 50, 50);
		border: 0.5rem solid #5f0f40;
		border-top-right-radius: 5rem;
		border-bottom-left-radius: 5rem;

		padding: 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	#prop-button{
        border-radius: 15px;
        background: #73AD21;
        padding: 10px;
        width: 20%;
        height: 25%;
        margin-right: 2%;
    }
</style>
