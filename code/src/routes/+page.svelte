<script>
	import { goto } from "$app/navigation";

	let email = '';
	let password = '';

	function handleLogin() {
		goto('/dashboard/owner/properties')
	}
</script>

<div>
	<h1>THIS IS THE LOGIN</h1>

	<form on:submit|preventDefault={handleLogin}>
		<label>
			Username:
			<input bind:value={email} required />
		</label>
		<br />

		<label>
			Password:
			<input type="password" bind:value={password} required />
		</label>
		<br />

		<button type="submit">Login</button>
	</form>
	<a href="/register">Register</a>
</div>
