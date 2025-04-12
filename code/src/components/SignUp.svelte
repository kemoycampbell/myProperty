<script>
    import user from "./user";
    import { goto } from '$app/navigation';
    let username = '';
    let password = '';
    let passwordConf = '';
    let firstname = '';
    let lastname = '';
    let email = '';
    let currentError = null;

    const SignUp = () =>{

    }
    if (username.trim() && email.trim() && password.trim() && passwordConf.trim() && firstname.trim() && lastname.trim()) {
      console.log('Form submitted:');
      goto('/confirm'); // navigate to another page
    } else {
      alert('Please fill out all fields.');
  }
  
</script>

    <div id="modal-wrapper">
        <div id="modal">
			<div class="form-container">
        <div class="form-group">
          <input type="First Name" bind:value={firstname} placeholder="First Name" required/>
				  <input type="Last Name" bind:value={lastname} placeholder="Last Name" required />
          <input type="email" bind:value={email} placeholder="Email" required/>
        </div>


				<div class="form-group">
				  <input type="text" bind:value={username} placeholder="Username" required />
				  <input type="password" bind:value={password} placeholder="Password" required />
				  <input type="confirm-password" bind:value={passwordConf} placeholder="Confirm Password" required/>
				</div>
				
			</div>
      <button class="login-btn" ><a href="/confirm">Register</a></button>
        </div>
    </div>
	
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
	.form-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 1rem;
        box-sizing: border-box;
    }

    .form-group {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        gap: 1rem;
        align-items: center;
        margin-right: 20px;
    }

    input {
        padding: 1rem;
        font-size: 1rem;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: larger;
        border-radius: 8px;
        border: 1px solid #ccc;
        border-top-right-radius: 1rem;
		border-bottom-left-radius: 1rem;
        width: 100%;
        box-sizing: border-box;
        transition: all 0.2s ease;
        text-align: center;
  	}

  input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px #007bff;
  }

  .login-btn {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-top: auto;
    padding: 1rem;
    font-size: 1.2rem;
    background-color: rgb(var(--dark-gold-rgb));
    align-self: center;
    margin-top: 1rem;
    width: 50%;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .login-btn:hover {
    background-color: rgb(var(--light-gold-rgb));
  }
</style> 