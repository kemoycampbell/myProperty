<script>
	import { goto } from "$app/navigation";

	function handleLogout() {
		localStorage.removeItem('token');

		goto('/');
	}
</script>

<div id="star-pattern">
	
		<h1>Dashboard</h1>
		<button on:click={handleLogout}>Logout</button>
	
	<main>
		<slot />
	</main>
</div>

<style>
	#star-pattern {
		background-image: url('../../components/myBuilding.png');
		background-size: 10%;
		position: absolute;
		left: 50%;
        background-color: rgb(48, 75, 36);
		top: 0px;
		translate: -50% 0%;
		z-index: 1;
		height: 100%;
		width: 100%;
		min-width: 1200px;
		animation: pan 180s linear infinite;
		overflow: hidden;
		will-change: background-position;
		color: white;
	}

    
	@keyframes pan {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 100% 0%;
		}
	}
</style>