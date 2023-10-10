<script>
	import { page } from '$app/stores';
	import UserEditor from '$lib/components/editors/UserEditor.svelte';
</script>

<UserEditor doc={$page.data.data} />
