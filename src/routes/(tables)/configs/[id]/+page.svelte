<script>
	import { page } from '$app/stores';
	import ConfigEditor from '$lib/components/editors/ConfigEditor.svelte';
</script>

<ConfigEditor doc={$page.data.data} />
