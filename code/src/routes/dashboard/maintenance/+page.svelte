<script>
    // Get all of the Maintenance Requests
    async function getAllMaintenanceRequests() {
        const res = await fetch('http://localhost:5173/api/maintenance_request/all', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!res.ok) {
            console.error("Failed to retrieve Maintenance Requests");
            return;
        }

        const data = await res.json();
        console.log(data);
    }

    getAllMaintenanceRequests();
</script>

<div>
    <!-- render data -->
</div>