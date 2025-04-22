

    <header>
        <h2 class="hello">Welcome Owner</h2>
        <a href="/dashboard/owner/properties">Properties</a>
        <a href="/dashboard/owner/accounts">Accounts</a>
        <a href="/dashboard/owner/assign">Assign</a>
        <a href="/dashboard/owner/documents">Documents</a>
        <a href="/dashboard/owner/maintenance">Maintenance</a>
    </header>
    <div id="star-container">
    <main>
        <slot />
    </main>
</div>
   

<style>
    #star-container {
		height: 100vh;
		overflow: hidden;
		position: relative;
	}
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

    #class-box button{
        border-radius: 15px;
		background: #73ad21;
		padding: 10px;
		width: 25%;
		height: 20%;
        margin-bottom: 5%;
        align-self: center;
		
    }

	
</style>