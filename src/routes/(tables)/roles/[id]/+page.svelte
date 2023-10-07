<script>
	import { page } from '$app/stores';
	import RoleEditor from '$lib/components/RoleEditor.svelte';
</script>

<RoleEditor doc={$page.data.data} />
