<script lang="ts">
    import {onDestroy, onMount} from 'svelte'
    import StarContainer from '../../components/StarContainer.svelte';
    import StripeContainer from '../../components/StripeContainer.svelte';
	import Login from '../../components/Login.svelte';
    onMount(() => console.log('Mounted Login Page'));
    onDestroy(() => console.log('Unmounted Login Page'));
</script>
{#if true}
	<div id="app">
		<Login />
		<StripeContainer />
		<StarContainer />
	</div>
{/if}

<style>
	:global(:root) {
		--glow-rgb: 245 245 245;
		--light-gold-rgb: 249 181 51;
		--dark-gold-rgb: 215 147 23;
		--primary-stripe-rgb: 230 230 230;
		--secondary-stripe-rgb: 240 240 240;
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


