<script>
	import { goto } from '$app/navigation';

	export let data;

	let unit = {
		number: '',
		property: data.id
	};

	async function handleSubmit() {
		const unitData = {
			number: unit.number,
			property: {
				id: unit.property
			}
		};

		const res = await fetch('http://localhost:5173/api/unit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(unitData)
		});

		if (res.ok) {
			goto(`/dashboard/owner/properties/${data.id}`);
		} else {
			console.error('Failed to create unit');
		}
	}
</script>

<div id="body">
	<div id="class-box">
		<form on:submit|preventDefault={handleSubmit}>
			<label>
				
				<input bind:value={unit.number} placeholder="Number" required />
			</label>
			<br />

			<button type="submit">Create Unit</button>
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
		height: 40%;
		margin-bottom: 5%;
		align-self: center;
	}
</style>
