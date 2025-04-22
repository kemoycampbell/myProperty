<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	type Document = {
		id: string;
		path: string;
		tenant: string;
		unit: string;
		createdAt: string;
		updatedAt: string;
	};

	let documents: Document[] = [];

	function decodeJWT(token: string) {
		const payload = token.split('.')[1];
		return JSON.parse(atob(payload));
	}

	onMount(async () => {
		const token = localStorage.getItem('token');

		if (!token) {
			console.error('Token not found');
			return;
		}

		let userInfo;
		try {
			userInfo = decodeJWT(token);
		} catch (err) {
			console.error('Invalid token', err);
			return;
		}

		const ownerId = userInfo?.id;

		if (!ownerId) {
			console.error('Owner ID not found in token');
			return;
		}

		try {
			const res = await fetch(`http://localhost:5173/api/property/document/${ownerId}`);
			const data = await res.json();
			documents = data.body.documents.map((doc: Document) => ({
				...doc,
				path: `http://localhost:5173/uploads/${doc.path.split('\\').pop()}` // Modificar la ruta del archivo
			}));
		} catch (err) {
			console.error('Error fetching documents', err);
		}
	});

	function goToAddDocument() {
		goto('/dashboard/owner/documents/add');
	}
</script>

<div id="body">
	<div id="class-box">
		<div id="add-form">
			<h2>Owner's Documents</h2>

			<button on:click={goToAddDocument}>Add Document</button>

			{#if documents.length > 0}
				<ul>
					{#each documents as doc}
						<li>
							<strong>Created At:</strong>
							{new Date(doc.createdAt).toLocaleString()} <br />
							<strong>Unit ID:</strong>
							{doc.unit} <br />
							<strong>Tenant ID:</strong>
							{doc.tenant} <br />
						</li>
					{/each}
				</ul>
			{:else}
				<p>No documents found.</p>
			{/if}
		</div>
	</div>
</div>

<style>
	#add-form {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
	}

	::-webkit-input-placeholder {
		text-align: center;
	}

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
		padding-top: 2%;
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
	#prop-button {
		border-radius: 15px;
		background: #73ad21;
		padding: 10px;
		width: 20%;
		height: 25%;
		margin-right: 2%;
	}
</style>
