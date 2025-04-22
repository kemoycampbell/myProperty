<script>
	import { onMount } from 'svelte';

	let properties = [];
	let units = [];
	let users = [];

	let selectedPropertyId = '';
	let selectedUnitId = '';
	let selectedUserId = '';
	let startDate = '';
	let endDate = '';

	function decodeJWT(token) {
		const payload = token.split('.')[1];
		return JSON.parse(atob(payload));
	}

	const token = localStorage.getItem('token');
	let userInfo;

	if (token) {
		try {
			userInfo = decodeJWT(token);
		} catch (error) {
			console.error('Error decoding token', error);
		}
	}

	// Cargar propiedades y usuarios al montar
	onMount(async () => {
		try {
			const [propertiesRes, usersRes] = await Promise.all([
				fetch(`/api/property/owner/${userInfo.id}`),
				fetch(`http://localhost:5173/api/user`)
			]);

			if (!propertiesRes.ok) throw new Error(`Failed to fetch properties: ${propertiesRes.status}`);
			if (!usersRes.ok) throw new Error(`Failed to fetch users: ${usersRes.status}`);

			const propertiesData = await propertiesRes.json();
			const usersData = await usersRes.json();

			properties = propertiesData.properties;
			users = usersData.users;
		} catch (error) {
			console.error('Error loading data:', error);
		}
	});

	// Cargar unidades al seleccionar propiedad
	async function fetchUnits() {
		if (!selectedPropertyId) return;

		try {
			const res = await fetch(`/api/unit/property/${selectedPropertyId}`);

			if (!res.ok) {
				throw new Error(`Failed to fetch units: ${res.status}`);
			}

			const data = await res.json();
			units = data.units;
		} catch (error) {
			console.error('Error loading units:', error);
		}
	}

	$: selectedPropertyId, fetchUnits();

	// Función para hacer el POST y asignar el inquilino
	async function assignTenant() {
		if (!selectedUserId || !selectedUnitId || !startDate || !endDate) {
			alert('Please fill in all fields.');
			return;
		}

		const payload = {
			tenant: selectedUserId,
			unit: selectedUnitId,
			startDate,
			endDate
		};

		try {
			const res = await fetch(`/api/unit/property/${userInfo.id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			if (!res.ok) {
				throw new Error(`Failed to assign tenant: ${res.status}`);
			}

			const result = await res.json();
			alert(result.message || 'Tenant assigned successfully!');
		} catch (error) {
			console.error('Error assigning tenant:', error);
			alert('Error assigning tenant.');
		}
	}
</script>

<div id="body">
	<div id="class-box">
        <div id="partition1">

        <div id="partition2">
		<p>Select a property</p>
		<select bind:value={selectedPropertyId}>
			<option value="">Select a property</option>
			{#each properties as property}
				<option value={property.id}>{property.name}</option>
			{/each}
		</select>

		{#if selectedPropertyId}
			<p>Select a unit</p>
			<select bind:value={selectedUnitId}>
				<option value="">Select a unit</option>
				{#each units as unit}
					<option value={unit.id}>{unit.number}</option>
				{/each}
			</select>
		{/if}
        </div>
        <div id="partition2">
		<p>Select a user</p>
		<select bind:value={selectedUserId}>
			<option value="">Select a user</option>
			{#each users as user}
				<option value={user.id}>{user.firstName} {user.lastName}</option>
			{/each}
		</select>

		<p>Start date</p>
		<input type="date" bind:value={startDate} />

		<p>End date</p>
		<input type="date" bind:value={endDate} />
        </div>
		<br /><br />
        <button on:click={assignTenant}>Assign Tenant</button>
    </div>
		
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
		justify-content: space-evenly;
		align-items: stretch;
		flex-wrap: wrap;
	}

	#class-box button {
		border-radius: 15px;
		background: #73ad21;
		padding: 10px;
		width: 30%;
		height: 35%;
		margin: 0%;
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

	#partition1 {
		display: flex;
        flex-wrap: wrap;
		align-items: center;
        padding-bottom: 10%;
        justify-content: center;
	}

	#partition2 {
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
