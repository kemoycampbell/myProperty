
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

	
</style>