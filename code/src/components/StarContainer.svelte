<div id="star-container">
	<div id="star-pattern"></div>
	<div id="star-gradient-overlay"></div>
</div>

<style>
	#star-container {
		background: radial-gradient(rgb(var(--light-gold-rgb)), rgb(var(--dark-gold-rgb)));
		height: 100vh;
		overflow: hidden;
		position: relative;
	}

	#star-pattern {
		background-image: url('/images/myBuilding.png');
		background-size: 10%;

		position: absolute;
		left: 50%;
		top: 0px;
		translate: -50% 0%;
		z-index: 1;
		height: 100%;
		width: 100%;
		min-width: 1200px;
		opacity: 0.1;
		animation: pan 180s linear infinite;
		will-change: background-position;
	}

	#star-gradient-overlay {
		background: radial-gradient(circle, transparent 75%, rgb(var(--dark-gold-rgb)));
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		opacity: 0.9;
		z-index: 2;
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
