<script>
// @ts-nocheck

    import user from "../components/user";
    let username = '';
    let password = '';
    let currentError = null;
    let visibility = true;

    const login = () =>{
        /*fetch(ForwhateverourURLisgoingtobe, {
              method: 'POST'
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({username:username, password:password})
        }),
        .then((res) => {
            if(res.status < 299) return res.json()
            if(res.status > 299) currentError = "Something not quire right with server response.";
        })
        .then((data) => {
            if(data) user.update(val => val {...data})
        })
        .catch((error) => {
            currentError = error;
            console.log("Error logging in: ", error)
        })
        */
    }


</script>
<div id="modal-wrapper">
    <div id="modal">
        <div class="form-container">
            <div class="form-group">
              <input type="text" bind:value={username} placeholder="Username" />
              <input type="password" bind:value={password} placeholder="Password" />
            </div>
            <button class="login-btn">Login</button>
        </div>
        <a href="/signup">Need to register? Click Here!</a>
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
        
      
	}

    .form-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 2rem;
        box-sizing: border-box;
    }

    .form-group {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
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
        width: 50%;
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