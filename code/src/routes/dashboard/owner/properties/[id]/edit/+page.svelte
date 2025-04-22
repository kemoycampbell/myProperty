<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let name = '';
	let address_line1 = '';
	let address_line2 = '';
	let city = '';
	let state = '';
	let zip = '';

	onMount(async () => {
		const res = await fetch(`/api/property/${data.id}`);
		if (res.ok) {
			const responseData = await res.json();
			const property = responseData.property;

			name = property.name;
			address_line1 = property.address_line1;
			address_line2 = property.address_line2 ?? '';
			city = property.city;
			state = property.state;
			zip = property.zip;
		}
	});

	async function handleSubmit() {
		const res = await fetch(`/api/property/${data.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				address_line1,
				address_line2,
				city,
				state,
				zip
			})
		});

		if (res.ok) {
			goto('/dashboard/owner/properties');
		} else {
			console.error('Error updating property');
		}
	}
</script>

<div id="body">
	<div id="class-box">
		<span style="font-size: 30px;">Edit Property</span>

		<form on:submit|preventDefault={handleSubmit}>
			<label>
				<input bind:value={name} placeholder="Name" required />
			</label><br />

			<label>
				<input bind:value={address_line1} placeholder="Address" required />
			</label><br />

			<!-- <label>
		Address Line 2:
		<input bind:value={address_line2} />
	</label><br /> -->

			<label>
				<input bind:value={city} placeholder="City" required />
			</label><br />

			<label>
				<input bind:value={state} placeholder="State" required maxlength="2" />
			</label><br />

			<label>
				<input bind:value={zip} placeholder="Zipcode" required maxlength="5" />
			</label><br />

			<button type="submit">Update Property</button>
		</form>
	</div>
</div>

<style>	
	#body {
		justify-items: center;
		padding-top: 10%;
		width: 100%;
		display: flex;
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

	#class-box button {
		border-radius: 15px;
		background: #73ad21;
		padding: 10px;
		width: 25%;
		height: 20%;
		margin-bottom: 5%;
		align-self: center;
	}
</style>
