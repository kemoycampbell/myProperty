<script>
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

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

	let name = '';
	let username = '';
    let password = '';

    onMount(() => {
        let user = users[data.id];
        if (user) {
            name = user.name;
            username = user.username;
            password = user.password;
        }
    });

	function handleSubmit() {
        goto('/dashboard/owner/accounts');
	}
    
</script>

<span>Edit Account</span>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		<input bind:value={name} placeholder="Name" required />
	</label>
	<br />

	<label>
		<input bind:value={username} placeholder="Username" required />
	</label>
	<br />

	<label>
		<input type="password" bind:value={password} placeholder="Password" required />
	</label>
	<br />

	<button type="submit">Update Account</button>
</form>
