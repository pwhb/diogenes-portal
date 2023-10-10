<script>
	import { page } from '$app/stores';
	import RouteEditor from '$lib/components/editors/RouteEditor.svelte';
</script>

<RouteEditor doc={$page.data.data} />
