<div id="star-container">
    <header>
        <h2 class="hello">Welcome Maintenance Manager</h2>
        <a href="/dashboard/maintenance_manager/all">All</a>
        <a href="/dashboard/maintenance_manager/assign">Assign</a>
    </header>

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