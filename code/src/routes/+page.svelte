<script>
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';

	function decodeJWT(token) {
		const payload = token.split('.')[1];
		return JSON.parse(atob(payload));
	}

	async function handleLogin() {
		const res = await fetch('http://localhost:5173/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});

		if (res.ok) {
			const { token } = await res.json();

			localStorage.setItem('token', token);

			try {
				const decodedToken = decodeJWT(token);
				console.log(decodedToken);
				const userRole = decodedToken.role;

				if (userRole === 'owner') {
					goto('/dashboard/owner/properties');
				} else if (userRole === 'tenant') {
					goto('/dashboard/tenant');
				} else if (userRole === 'maintenance manager') {
					goto('/dashboard/maintenance/all');
				} else if (userRole === 'maintenance operator') {
					goto('/dashboard/operator');
				}
			} catch (error) {
				console.error('Error decoding token', error);
				goto('/');
			}
		} else {
			console.error('Login failed');
		}
	}
</script>

<div id="body">
	<div id="star-container">
		<h1 id="login-Title">My-Property</h1>
		<div id="class-box">
			<form id="login-Form" on:submit|preventDefault={handleLogin}>
				<h2 style="color: darkkhaki;">Sign-In</h2>
				<label>
					<input type="text" bind:value={username} placeholder="Username" required />
				</label>

				<br />

				<label>
					<input type="password" bind:value={password} placeholder="Password" required />
				</label>
				<br />

				<button id="submit-button" type="submit">Login</button>
			</form>
		</div>
		<a href="/register">Register</a>
	</div>
</div>

<div id="star-pattern"></div>

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


	#star-container {
		height: 100vh;
		overflow: hidden;
		position: relative;
	}

	#star-pattern {
		background-image: url('../components/myBuilding.png');
		background-size: 10%;
		position: absolute;
		left: 50%;
        background-color: rgb(84, 120, 67);
		top: 0px;
		translate: -50% 0%;
		z-index: 1;
		height: 100%;
		width: 100%;
		min-width: 1200px;
		opacity: 0.5;
		animation: pan 180s linear infinite;
		overflow: hidden;
		will-change: background-position;
	}

    #submit-button{
        border-radius: 15px;
        background: #73AD21;
        padding: 10px;
        width: 50%;
        height: 55%;
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
