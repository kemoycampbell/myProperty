<script>
	import { getUserInfo} from "$lib/utils/account";
	import { onMount } from "svelte";

    let documents = [];

    let userInfo;

    onMount(() => {
		userInfo = getUserInfo();
		console.log(userInfo);

		// you could fetch documents here too, e.g.:
		// fetchDocuments(userInfo.id);
	});

 

</script>

<div>
    <h1>Document lists</h1>

</div>