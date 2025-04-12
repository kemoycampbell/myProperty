<script>
    const properties = {
        1: {
            name: "Furnished House",
            address: "Main Street #123, City",
            type: "House",
            status: "Rented"
        },
        2: {
            name: "Modern Office",
            address: "Central Avenue #456, City",
            type: "Office",
            status: "Available"
        },
        3: {
            name: "Beach Apartment",
            address: "Ocean Drive #789, City",
            type: "Apartment",
            status: "Rented"
        }
    };

    export let data;
    let property = properties[data.id];
</script>

<div>
    <span>{property.name}</span>
    <p><strong>Address:</strong> {property.address}</p>
    <p><strong>Type:</strong> {property.type}</p>
    <p><strong>Status:</strong> {property.status}</p>
    <a href="/dashboard/owner/properties">Back to Property List</a>
</div>