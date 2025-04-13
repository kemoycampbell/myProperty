<script>
    const users = {
        1: {
            name: "Jose",
            username: "j123",
            password: "qwerty123"
        },
        2: {
            name: "Vanessa",
            username: "v123",
            password: "qwerty123"
        },
        3: {
            name: "Lucille",
            username: "l123",
            password: "qwerty123"
        }
    };

    export let data;
    let user = users[data.id];
</script>

<div>
    <span>{user.name}</span>
    <p><strong>Username:</strong> {user.username}</p>
    <a href="/dashboard/owner/accounts">Back to Accounts List</a>
</div>