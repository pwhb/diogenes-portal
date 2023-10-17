<script>
	import { page } from '$app/stores';
	import AssetEditor from '$lib/components/editors/AssetEditor.svelte';
</script>

<AssetEditor doc={$page.data.data}  />
