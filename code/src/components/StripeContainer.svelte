<div id="stripe-container">
	<div id="stripe-pattern"></div>
</div>

<style>
	#stripe-container {
		position: absolute;
		z-index: 3;
		left: 50%;
		bottom: 0px;
		translate: -50% 0%;
		height: 28vh;
		min-height: 240px;
		width: 100%;
		min-width: 2000px;
		background-color: rgb(var(--primary-stripe-rgb));
	}

	#stripe-pattern {
		height: 100%;
		width: 100%;
		background-size: 18px 18px;
		background-image: linear-gradient(
			-45deg,
			rgb(var(--primary-stripe-rgb)) 25%,
			rgb(var(--secondary-stripe-rgb)) 25%,
			rgb(var(--secondary-stripe-rgb)) 50%,
			rgb(var(--primary-stripe-rgb)) 50%,
			rgb(var(--primary-stripe-rgb)) 75%,
			rgb(var(--secondary-stripe-rgb)) 75%,
			rgb(var(--secondary-stripe-rgb)) 100%
		);
		box-shadow: inset 0rem 0.5rem 2rem 0.25rem rgb(0 0 0 / 40%);
		animation: pan 360s linear infinite;
	}
</style>
