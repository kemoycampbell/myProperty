<script>
	import { goto } from "$app/navigation";

    let confirmationCode = '';

    if (confirmationCode == confirmationCode){
        goto("/login");
    }
</script>

<div id="modal-wrapper">
	<div id="modal">
        <h1 style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; padding-bottom: 5%; color: rgb(239, 248, 226);">Confirm E-Mail</h1>
        <div class="form-container">
            <div class="form-group">
                <input type="First Name" bind:value={confirmationCode} placeholder="Confirmation Code" />
            </div>
        </div>
        
        
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

    
</style> 