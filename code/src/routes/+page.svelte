<script>
    import { goto } from "$app/navigation";

    let username = '';
    let password = '';

    function decodeJWT(token) {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }

    async function handleLogin() {
        const res = await fetch('http://localhost:5173/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        if (res.ok) {
            const { token } = await res.json();

            localStorage.setItem('token', token);
			
            try {
                const decodedToken = decodeJWT(token);
				console.log(decodedToken)
                const userRole = decodedToken.role;
				
                if (userRole === 'owner') {
                    goto('/dashboard/owner/properties');
                } else if (userRole === 'tenant') {
                    goto('/dashboard/tenant');
                } else if (userRole === 'maintenance manager') {
                    goto('/dashboard/maintenance');
                }
            } catch (error) {
                console.error("Error decoding token", error);
                goto('/');
            }
        } else {
            console.error('Login failed');
        }
    }
</script>

<div>
    <h1>Login</h1>

    <form on:submit|preventDefault={handleLogin}>
        <label>
            Username:
            <input type="text" bind:value={username} required />
        </label>
        <br />

        <label>
            Password:
            <input type="password" bind:value={password} required />
        </label>
        <br />

        <button type="submit">Login</button>
    </form>
    <a href="/register">Register</a>
</div>