<script>
	import { goto } from "$app/navigation";

	let firstName = '';
	let lastName = '';
	let email = '';
	let username = '';
	let password = '';
	let role = 'owner';

	// function decodeJWT(token) {
	// 	const payload = token.split('.')[1];
	// 	return JSON.parse(atob(payload));
	// }

	async function handleRegister() {
		const res = await fetch('http://localhost:5173/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				username,
				password,
				role
			})
		});

		if (res.ok) {
			const { token } = await res.json();

			// const userInfo = decodeJWT(token);
			// console.log('User info:', userInfo);

			localStorage.setItem('token', token);

			goto('/dashboard/owner/properties');
		} else {
			console.error('Failed to register');
		}
	}
</script>

<div>
	<div id="body">
	<div id="star-container">
		<h1 id="register-Title">Register</h1>
	<div id="class-box">
		
	<form id="register-form" on:submit|preventDefault={handleRegister}>
		
		<label>
			<input type="text" bind:value={firstName} placeholder="First Name" required />
		</label>
	

		<label>
			<input type="text" bind:value={lastName} placeholder="Last Name" required />
		</label>
	

		<label>
			<input type="email" bind:value={email} placeholder="E-Mail" required />
		</label>
	

		<label>

			<input type="text" bind:value={username} placeholder="Username" required />
		</label>
		

		<label>
			<input type="password" bind:value={password} placeholder="Password" required />
		</label>
		
	
		<button id="submit-button" type="submit">Register</button>
	</form>
	
</div>
<p class="form-footer">Already registered? <a href="../">Log in</a></p>
</div>

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

	#register-form {
		display: flex;
		flex-direction: column;
		justify-items: center;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		align-items: center;
		gap: 10px;
	}

	#register-Title {
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
		background-image: url('../../components/myBuilding.png');
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
        height: 25%;
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
