<script>
	import { goto } from "$app/navigation";

	let firstname = '';
	let lastname = '';
	let email = '';
	let password = '';
	let role = 'admin';

	function handleRegister() {
		goto('/dashboard/owner/properties');
	}
</script>

<div>
	<h1>Register</h1>

	<form on:submit|preventDefault={handleRegister}>
		<label>
			First Name:
			<input type="text" bind:value={firstname} required />
		</label>
		<br />

		<label>
			Last Name:
			<input type="text" bind:value={lastname} required />
		</label>
		<br />

		<label>
			Email:
			<input type="email" bind:value={email} required />
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
