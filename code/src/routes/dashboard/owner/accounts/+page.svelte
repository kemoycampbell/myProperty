<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let users = [];

	async function fetchUsers() {
		const response = await fetch('http://localhost:5173/api/user');
		const data = await response.json();
		users = data.users;
	}

	onMount(() => {
		fetchUsers();
	});

	function goToDetails(id) {
		goto(`/dashboard/owner/accounts/${id}`);
	}

	// function goToEdit(id) {
	//     goto(`/dashboard/owner/accounts/${id}/edit`);
	// }

	function deleteAccount(id) {
		console.log(`account ${id} deleted`);
	}
</script>
<div id="body">
    <div id="partition1">
        <p id="login-Title">List of Accounts</p>
        <button id="accountAddButton" on:click={() => goto('/dashboard/owner/accounts/add')}>Add</button>
    </div>



    <div id="class-box">
	<ul style="color: white;">
		{#if users.length > 0}
			{#each users as user}
				<li>
					<strong>{user.firstName} {user.lastName}</strong>
					<button on:click={() => goToDetails(user.id)}>View</button>
					<!-- No edit for this iteration future work! -->
					<!-- <button on:click={() => goToEdit(user.id)}>Edit</button> -->
					<button on:click={() => deleteAccount(user.id)}>Delete</button>
				</li>
			{/each}
		{:else}
			<p>No users found.</p>
		{/if}
	</ul>
</div>
</div>


	
<style>
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

	#login-Form {
		display: flex;
		flex-direction: column;
		justify-items: center;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		align-items: center;
	}

	#login-Title {
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		font-size: 50px;
		color: #0f4c5c;
		-webkit-text-stroke: 0.5px whitesmoke;
		justify-self: center;
	}

	::-webkit-input-placeholder {
		text-align: center;
	}

	#star-container {
		height: 100vh;
		overflow: hidden;
		position: relative;
	}

	#star-pattern {
		background-image: url('../../../../components/myBuilding.png');
		background-size: 10%;
		position: absolute;
		left: 50%;
		background-color: rgb(84, 120, 67);
		top: 0px;
		translate: -50% 0%;
		z-index: 1;
		height: 100%;
		width: 100%;
		min-width: 1200px;
		opacity: 0.5;
		animation: pan 180s linear infinite;
		overflow: hidden;
		will-change: background-position;
	}

    #partition1{
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 0.51rem;
    }

	#accountAddButton {
		border-radius: 15px;
		background: #73ad21;
		padding: 10px;
		width: 13.5%;
		height: 13.5%;
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
