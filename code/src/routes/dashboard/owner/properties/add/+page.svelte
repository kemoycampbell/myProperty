<script>
	import { goto } from '$app/navigation';

	let property = {
		name: '',
		address_line1: '',
		city: '',
		state: '',
		zip: ''
	};

	function decodeJWT(token) {
		const payload = token.split('.')[1];
		return JSON.parse(atob(payload));
	}

	const token = localStorage.getItem('token');
	const userInfo = token ? decodeJWT(token) : null;
	const ownerId = userInfo ? userInfo.id : '';

	async function handleSubmit() {
		const propertyData = {
			name: property.name,
			address_line1: property.address_line1,
			city: property.city,
			state: property.state.slice(0, 2),
			zip: property.zip.slice(0, 10),
			owner: ownerId
		};

		const res = await fetch('http://localhost:5173/api/property', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(propertyData)
		});

		if (res.ok) {
			goto('/dashboard/owner/properties');
		} else {
			console.error('Failed to create property');
		}
	}
</script>

<div id="modal-wrapper">
	<div id="modal">
		<h2>Add New Property</h2>

		<form on:submit|preventDefault={handleSubmit}>
			<div id="partition-1">
                <div id="partition-2">
				<label>
					<input bind:value={property.name} placeholder="Name" required />
				</label>
				<br />

				<label>
					<input bind:value={property.address_line1} placeholder="Address" required />
				</label>
				<br />

				<label>
					<input bind:value={property.city} placeholder="City" required />
				</label>
				<br />
                    </div>
                    <div id="partition-2">
				<label>
					<input bind:value={property.state} placeholder="State" required maxlength="2" />
				</label>
				<br />
            

				<label>
					<input bind:value={property.zip} placeholder="Zip Code" required maxlength="10" />
				</label>
				<br />

				<button id="prop-button" type="submit">Create Property</button></div>
			</div>
		</form>
	</div>
</div>

<style>
	.form-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 1rem;
		box-sizing: border-box;
	}

	.form-group {
		flex-grow: 2;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	#modal-wrapper {
		width: 100%;
		height: 72vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0px;
		top: 0px;
		z-index: 10;
	}

	#modal {
		width: 50vw;
		height: 65vh;
		max-width: 800px;
		max-height: 600px;
		background-color: rgb(50, 50, 50);
		border: 0.5rem solid rgb(30, 30, 30);
		border-top-right-radius: 5rem;
		border-bottom-left-radius: 5rem;
		box-shadow: 12px 25px 50px 12px rgba(0, 0, 0, 0.5);
		padding: 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	#partition-1 {
		display: flex;
		flex-direction: row;
        justify-content: center;
        padding-top: 10%;
	}

	#partition-2 {
		display: flex;
		flex-direction: column;
        padding-left: 10%;
        padding-right: 10%;
	}

    #prop-button{
        border-radius: 15px;
        background: #73AD21;
        padding: 10px;
        width: 100%;
        height: 55%;
        margin-right: 2%;
    }
</style>
