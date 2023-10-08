<script>
	import { page } from '$app/stores';
	import RouteEditor from '$lib/components/RouteEditor.svelte';
</script>

<RouteEditor doc={$page.data.data} />
