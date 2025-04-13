<script>
	import { goto } from "$app/navigation";

	function handleLogout() {
		localStorage.removeItem('token');

		goto('/');
	}
</script>

<div>
	<header>
		<h1>Dashboard</h1>
		<button on:click={handleLogout}>Logout</button>
	</header>
	<main>
		<slot />
	</main>
</div>
