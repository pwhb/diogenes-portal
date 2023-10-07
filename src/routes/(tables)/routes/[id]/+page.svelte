<script>
	import { page } from '$app/stores';
	import RouteEditor from '$lib/components/RouteEditor.svelte';
	console.log($page.data);
</script>

<RouteEditor doc={$page.data.data} />
