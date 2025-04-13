<script>
	import { goto } from "$app/navigation";

	let name = '';
	let username = '';
	let password = '';

	function handleSubmit() {
        goto('/dashboard/owner/accounts');
	}
</script>

<span>Add account</span>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		Name:
		<input bind:value={name} required />
	</label>
	<br />

	<label>
		Username:
		<input bind:value={username} required />
	</label>
	<br />

	<label>
		Password:
		<input type="password" bind:value={password} required />
	</label>
	<br />

	<button type="submit">Create Account</button>
</form>
