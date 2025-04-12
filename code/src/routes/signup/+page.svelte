<script>
	import StarContainer from '../../components/StarContainer.svelte';
	import StripeContainer from '../../components/StripeContainer.svelte';
	import Modal from '../../components/Modal.svelte';
	console.log('Rendering +page.svelte');
</script>

{#if true}
	<div id="app">
		<Modal />
		<StripeContainer />
		<StarContainer />
	</div>
{/if}

<style>
	:global(:root) {
		--glow-rgb: 66, 75, 84;
		--light-gold-rgb: 120, 212, 206;
		--dark-gold-rgb: 33, 125, 135;
		--primary-stripe-rgb: 239, 248, 226;
		--secondary-stripe-rgb: 242, 215, 212;
	}

	:global(body) {
		background-color: white;
		cursor: auto;
		overflow: hidden;
	}

	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
</style>
