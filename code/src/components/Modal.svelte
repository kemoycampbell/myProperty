<script lang="ts">
	let showModal = true;

	function closeModal() {
		showModal = false;
	}
</script>

{#if showModal}
	<div id="modal-wrapper">
		<div id="modal">
			<p>Save progress?</p>
			<button on:click={closeModal}>Back</button>
			<button>OK</button>
		</div>
	</div>
{/if}

<style>
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
		width: 60vw;
		height: 40vh;
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
		align-items: center;
	}
</style>
