<script>
	import { getUserInfo} from "$lib/utils/account";
	import { onMount } from "svelte";

    let documents = [];

    let userInfo;

	//async onMount function to fetch the user info

	onMount(async () => {
		userInfo = getUserInfo();
		console.log(userInfo);

		const response = await fetch(`/api/tenant/document/${userInfo.id}`);
	});



</script>

<div>
    <h1>Document lists</h1>

</div>