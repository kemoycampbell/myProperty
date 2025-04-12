<script>
	import { goto } from "$app/navigation";

	let firstName = '';
	let lastName = '';
	let email = '';
	let username = '';
	let password = '';
	let role = 'owner';

	// function decodeJWT(token) {
	// 	const payload = token.split('.')[1];
	// 	return JSON.parse(atob(payload));
	// }

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
			const { token } = await res.json();

			// const userInfo = decodeJWT(token);
			// console.log('User info:', userInfo);

			localStorage.setItem('token', token);

			goto('/dashboard/owner/properties');
		} else {
			console.error('Failed to register');
		}
	}
</script>

<div>
	<h1>Register</h1>

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

		<button type="submit">Register</button>
	</form>
</div>
